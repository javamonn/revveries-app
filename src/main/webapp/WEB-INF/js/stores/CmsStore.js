import Reflux from 'reflux';
import fetch from 'node-fetch';

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
