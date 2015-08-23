import Reflux from 'reflux';
import { List } from 'immutable';
import AppActions from 'actions/AppActions';
import Gallery from 'stores/records/GalleryRecord';
import Picture from 'stores/records/PictureRecord';

var _galleries;
var _defaultPicture;

// TODO: Lazy load in active gallery, don't load all images up front
var AppStore = Reflux.createStore({

  listenables: AppActions,

  getGalleryForSlug(slug) {
    return _galleries.find(gal => gal.slug == slug);
  },

  onDisplayOverlay(picture) {
    this.trigger({
      overlay: {
        visible: true,
        picture: picture
      }
    });
  },

  onHideOverlay() {
    this.trigger({
      overlay: {
        visible: false
      }
    })
  },

  getInitialState() {
    if (_galleries === undefined || _defaultPicture === undefined) {
      var galleries = List(
        initialGalleries.map(data => {
          var pictures = List(data.pictures.map(picture => new Picture(picture)));
          data.gallery.pictures = pictures;
          return new Gallery(data.gallery);
        })
      );
      _defaultPicture = galleries.get(0).pictures.get(0);
      _galleries = galleries.delete(0);
    }
    return {
      galleries: _galleries,
      defaultPicture: _defaultPicture,
      overlay: {
        visible: false
      }
    };
  }
});

module.exports = AppStore;
