import Reflux from 'reflux';
import { List }  from 'immutable';
import AWS from 'aws-sdk';
import cuid from 'cuid';

const PictureActions = require('../actions/PictureActions');
const Picture = require('./records/PictureRecord');
const Gallery = require('./records/GalleryRecord');
const env = require('../config');

AWS.config.region = env.AWS_REGION
AWS.config.update({
  accessKeyId: env.AWS_AKID,
  secretAccessKey: env.AWS_SK
});
var _S3 = new AWS.S3();
var _gallery;

var PictureStore = Reflux.createStore({
  listenables: PictureActions,

  /**
   * TODO: Lack of picture id disallows optimistic picture creation here.
   * Backend needs to be refactored to enable this.
   */
  onPictureCreated(image, title, description) {
    var awsURL = cuid();
    // don't need local URL until optimisitic creation
    //var localURL =  URL.createObjectURL(image);
    var awsPromise = new Promise(
      (resolve, reject) => {
        _S3.putObject({
          Bucket: env.AWS_BUCKET,
          Key: `images/${awsURL}`,
          Body: image,
          ContentType: image.type
        }, (err, data) => (err) ? reject(err) : resolve(data));
      }
    );
    var apiPromise = fetch('/api/pictures', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({
        title: title,
        description: description,
        url: env.AWS_URI + awsURL,
        galleryId: _gallery.galleryId,
        pictureOrder: _gallery.pictures.size
      })
    })
    .then(res => res.json())
    return Promise.all([awsPromise, apiPromise])
      .then(picture => _updatePictures(_gallery.pictures.push(new Picture(picture))))
  },

  onPictureEdited(picture) {
    // TODO: implement
  },

  onPictureDeleted(pictureIndex) {
    var pictureId = _gallery.pictures.get(pictureIndex).pictureId;
    _updatePictures(
      _gallery.pictures
        .delete(pictureIndex)
        .map((picture, index) => {
          return (index >= pictureIndex) ? picture.set('pictureOrder', picture.pictureOrder - 1) : picture;
        })
    );
    var deleteAction = fetch(`/api/pictures/${pictureId}`, {
      method: 'delete',
      credentials: 'include'
    }).then(res => {
      var updateOrderPromises = _gallery.pictures.reduce((memo, picture, index) => {
        if (index >= pictureIndex) {
          memo.push(fetch(`/api/pictures/${picture.pictureId}`, {
            method: 'put',
            credentials: 'include',
            body: JSON.stringify(picture.toJS())
          }));
        }
        return memo;
      }, []);
      return Promise.all(updateOrderPromises);
    });
    return deleteAction;
  },

  onPictureMoved(oldIndex, newIndex) {
    _updatePictures(_gallery.pictures.map((picture, index) => {
      if (index == oldIndex) return _gallery.pictures.get(newIndex);
      else if (index == newIndex) return _gallery.pictures.get(oldIndex);
      else return picture;
    }));
    var pictureNew = _gallery.pictures.get(newIndex);
    var moveAction = fetch(`/api/pictures/${pictureNew.pictureId}`, {
      method: 'put',
      credentials: 'include',
      body: JSON.stringify(pictureNew.set('pictureOrder', newIndex).toJS())
    });
    var pictureOld = _gallery.pictures.get(oldIndex);
    var moveReaction = fetch(`/api/pictures/${pictureOld.pictureId}`, {
      method: 'put',
      credentials: 'include',
      body: JSON.stringify(pictureOld.set('pictureOrder', oldIndex).toJS())
    });
    return Promise.all([moveAction, moveReaction]);
  },

  getInitialState(galleryId) {
    var picturesPromise = fetch(`/api/galleries/${galleryId}/pictures`).then(res => res.json())
    var galleryPromise = fetch(`/api/galleries/${galleryId}`).then(res => res.json())
    return Promise.all([picturesPromise, galleryPromise])
      .then(data => {
        data[1][0].pictures = List(data[0].map(pic => new Picture(pic)));
        _gallery = new Gallery(data[1][0]);
        return _gallery;
      });
  }
});

var _updatePictures = pictures => {
  _gallery = _gallery.set('pictures', pictures);
  PictureStore.trigger(_gallery);
};

module.exports = PictureStore;
