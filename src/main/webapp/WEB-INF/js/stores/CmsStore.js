import Reflux from 'reflux';
import CmsActions from 'actions/CmsActions'

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

  }
});

module.exports = CmsStore;
