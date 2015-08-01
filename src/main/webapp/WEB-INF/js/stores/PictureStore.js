import Reflux from 'reflux';
import { List }  from 'immutable';
import AWS from 'aws-sdk';
import cuid from 'cuid';
import env from '.config';

const PictureActions = require('../actions/PictureActions');
const Picture = require('./records/PictureRecord');

AWS.config.region = env.AWS_REGION
AWS.config.update({
  accessKeyId: env.AWS_AKID,
  secretAccessKey: env.AWS_SK
});
var _S3 = new AWS.S3();

var _pictures = List([]);
var _galleryId = -1;

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
      body: JSON.stringify({
        title: title,
        description: description,
        url: env.AWS_URI + awsURL,
        galleryId: _galleryId,
        pictureOrder: _pictures.size
      })
    })
    .then(res => res.json())
    return Promise.all([awsPromise, apiPromise])
      .then(picture => _updatePictures(_pictures.push(new Picture(picture))))
  },

  onPictureEdited(picture) {
    // TODO: implement
  },

  onPictureDeleted(pictureId) {

  },

  onPictureMoved(oldIndex, newIndex) {
    console.log('on picture moved');
    _updatePictures(_pictures.map((picture, index) => {
      if (index == oldIndex) return _pictures.get(newIndex);
      else if (index == newIndex) return _pictures.get(oldIndex);
      else return picture;
    }));
    var pictureNew = _pictures.get(newIndex);
    var moveAction = fetch(`/api/pictures/${pictureNew.pictureId}`, {
      method: 'put',
      body: JSON.stringify(pictureNew.set('pictureOrder', newIndex).toJS())
    });
    var pictureOld = _pictures.get(oldIndex);
    var moveReaction = fetch(`/api/pictures/${pictureOld.pictureId}`, {
      method: 'put',
      body: JSON.stringify(pictureOld.set('pictureOrder', oldIndex).toJS())
    });
    return Promise.all([moveAction, moveReaction]);
  },

  getInitialState(galleryId) {
    _galleryId = galleryId;
    return fetch(`/api/galleries/${galleryId}/pictures`)
      .then(res => res.json())
      .then(pictures => {
        _pictures = List(pictures.map(pic => new Picture(pic)));
        return _pictures;
      });
  }
});

var _updatePictures = pictures => {
  _pictures = pictures;
  PictureStore.trigger(_pictures);
};

module.exports = PictureStore;
