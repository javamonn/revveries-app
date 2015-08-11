import Reflux from 'reflux';
import { List } from 'immutable';
import Gallery from 'stores/records/GalleryRecord';
import Picture from 'stores/records/PictureRecord';

var _galleries;
var _defaultPicture;

var AppStore = Reflux.createStore({
  getInitialState() {
    if (_galleries === undefined || _defaultPicture === undefined) {
      var galleries = List(
        initialGalleries.map(gallery => {
          pictures = List(gal.pictures.map(picture => new Picture(picture)));
          gallery.pictures = pictures;
          return new Gallery(gallery);
        })
      );
      _defaultPicture = galleries.get(0).pictures.get(0);
      _galleries = galleries.delete(0);
    }
    return {
      galleries: _galleries,
      defaultPicture: _defaultPicture
    };
  }
});

module.exports = AppStore;
