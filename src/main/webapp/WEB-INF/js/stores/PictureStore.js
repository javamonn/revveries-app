import Reflux from 'reflux';
import { List }  from 'immutable';
import AWS from 'aws-sdk';
import cuid from 'cuid';
import env from '.config';

const PictureActions = require('../actions/CmsActions');
const Picture = require('./records/GalleryRecord');

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
  onPictureCreated(title, description, image) {
    var awsURL = cuid();
    var localURL =  URL.createObjectURL(image);
    var awsPromise = new Promise(
      (resolve, reject) => {
        _S3.putObject({
          Bucket: env.AWS_BUCKET,
          Key: `images/${imageUrl}`,
          Body: file,
          ContentType: file.type
        }, (err, data) => (err) ? reject(err): resolve(data));
      }
    );
    var apiPromise = fetch('/api/pictures', {
      action: 'put',
      body: JSON.stringify({
        title: title,
        description: description,
        url: awsURL,
        galleryId: _galleryId,
        pictureOrder: _pictures.size()
      })
    })
    .then(res => res.json())
    .then(picture => _updatePictures(_pictures.push(new Picture(picture))))
    return Promise.all([awsPromise, apiPromise]);
  },

  onPictureEdited(picture) {

  },

  onPictureDeleted(pictureId) {

  },


  onPictureMoved() {

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
