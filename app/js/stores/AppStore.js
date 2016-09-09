/* global initialGalleries */
import Reflux from 'reflux'
import { List } from 'immutable'
import AppActions from 'actions/AppActions'
import Gallery from 'stores/records/GalleryRecord'
import Picture from 'stores/records/PictureRecord'

var _galleries
var _defaultPicture
var _info

// TODO: Lazy load in active gallery, don't load all images up front
var AppStore = Reflux.createStore({

  listenables: AppActions,

  getGalleryForSlug (slug) {
    return _galleries.find(gal => gal.slug === slug)
  },

  onDisplayPictureOverlay (picture) {
    this.trigger({
      overlay: {
        visible: true,
        picture: picture,
        type: 'picture'
      }
    })
  },

  onDisplayGalleryListOverlay () {
    this.trigger({
      overlay: {
        visible: true,
        type: 'galleryList'
      }
    })
  },

  onHideOverlay () {
    this.trigger({
      overlay: {
        visible: false
      }
    })
  },

  getInitialState () {
    if (_galleries === undefined || _defaultPicture === undefined || _info === undefined) {
      var galleries = List(
        initialGalleries
          .map(data => {
            var pictures = List(data.pictures.map(picture => new Picture(picture)))
              .sort((a, b) => parseInt(a.pictureOrder) - parseInt(b.pictureOrder))
            data.gallery.pictures = pictures
            return new Gallery(data.gallery)
          })
          .sort((a, b) => parseInt(a.galleryOrder) - parseInt(b.galleryOrder))
      )


      // Remove the "Landing" gallery so that it doesn't appear in the sidenav
      // and set the landing image.
      var landingIdx = galleries.findIndex(gal => gal.get('name') === 'Landing')
      if (landingIdx !== -1) {
        _defaultPicture = galleries.get(landingIdx).pictures.get(0)
        galleries = galleries.delete(landingIdx)
      }

      // Remove the "Info" gallery so that it doesn't appear in the sidenav
      // and set the info gallery.
      var infoIdx = galleries.findIndex(gal => gal.get('name') === 'Info')
      if (infoIdx !== -1) {
        _info = galleries.get(landingIdx)
        galleries = galleries.delete(infoIdx)
      }

      _galleries = galleries
    }
    return {
      galleries: _galleries,
      defaultPicture: _defaultPicture,
      info: _info,
      overlay: {
        visible: false
      }
    }
  }
})

module.exports = AppStore
