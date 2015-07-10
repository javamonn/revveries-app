import Reflux from 'reflux';
import fetch from 'node-fetch';
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

  onGalleryCreated() {

  },

  onGalleryEdited() {

  },
  
  onGalleryDeleted() {
    
  },

  getInitialState() {
    fetch('/api/galleries/')
      .then(res => res.json())
      .then(galleries => {
        List(galleries.map(gal => new Gallery(gal)))
      })
  }
});

module.exports = CmsStore;
