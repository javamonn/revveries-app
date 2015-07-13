import Reflux from 'reflux';
import { List }  from 'immutable';

const CmsActions = require('../actions/CmsActions');
const Gallery = require('./records/GalleryRecord');

var _galleries = List([]);

var CmsStore = Reflux.createStore({
  listenables: CmsActions,

  onPictureCreated() {

  },

  onPictureEdited() {

  },

  onPictureDeleted() {

  },

  onGalleryCreated(title, description) {
    return fetch('/api/galleries/', {
      method: 'post',
      body: JSON.stringify({
        name: title,
        description: description,
        galleryOrder: _galleries.size
      })
    })
    .then(res => res.json())
    .then(galleries => {
      _updateGalleries(_galleries.push(new Gallery(galleries)))
    });
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

var _updateGalleries = galleries => {
  console.log('_updateGalleries');
  _galleries = galleries;
  CmsStore.trigger(_galleries);
}

module.exports = CmsStore;
