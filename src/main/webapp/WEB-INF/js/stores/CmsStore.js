import Reflux from 'reflux';

const CmsActions = require('../actions/CmsActions');

var CmsStore = Reflux.createStore({
  listenables: CmsActions,

  onPictureCreated() {

  },

  onPictureEdited() {

  },

  onPictureDeleted() {

  },

  onGalleryCreated() {

  },

  onGalleryEdited() {

  },
  
  onGalleryDeleted() {
    
  },

  getInitialState() {
    fetch('/api/galleries/')
      .then(res => res.json())
  }
});

module.exports = CmsStore;
