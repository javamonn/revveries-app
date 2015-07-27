import Reflux from 'reflux';
import { List }  from 'immutable';

const PictureActions = require('../actions/CmsActions');
const Picture = require('./records/GalleryRecord');

var _pictures = List([]);
var _galleryId = -1;

var PictureStore = Reflux.createStore({
  listenables: PictureActions,

  onPictureCreated(title, description, url) {

  },

  onPictureEdited(picture) {

  },

  onPictureDeleted(pictureId) {

  },


  onPictureMoved() {

  },

  getInitialState(galleryId) {
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
