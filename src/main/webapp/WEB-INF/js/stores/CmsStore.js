import Reflux from 'reflux';
import { List }  from 'immutable';

const CmsActions = require('../actions/CmsActions');
const Gallery = require('./records/GalleryRecord');

var _galleries;

var CmsStore = Reflux.createStore({
  listenables: CmsActions,

  onPictureCreated() {

  },

  onPictureEdited() {

  },

  onPictureDeleted() {

  },

  onGalleryCreated(title, description) {
    fetch('/api/galleries/', {
      method: 'post',
      body: JSON.stringify({
        name: title,
        description: description,
        galleryOrder: _galleries.length
      })
    })
    .then(res => res.json())
    .then(galleries => {
      _updateGalleries(_galleries.push(new GalleryRecord(galleries)))
    })
  },

  onGalleryEdited() {

  },
  
  onGalleryDeleted() {
    
  },

  getInitialState() {
    return fetch('/api/galleries/')
      .then(res => res.json())
      .then(galleries => {
        _galleries = List(galleries.map(gal => new Gallery(gal)))
        return _galleries;
      });
  }
});

var _updateGalleries = function(galleries) {
  _galleries = galleries;
  CmsStore.trigger(_galleries);
}

module.exports = CmsStore;
