import Reflux from 'reflux';
import { List } from 'immutable';

const CmsActions = require('../actions/CmsActions');
const Gallery = require('./records/GalleryRecord');
const Picture = require('./records/PictureRecord');

var _galleries = List([]);

/**
 * TODO: Rename to GalleryStore
 */
var CmsStore = Reflux.createStore({
  listenables: CmsActions,

  onGalleryCreated(title, description) {
    return fetch('/api/galleries/', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({
        name: title,
        slug: title.toLowerCase().replace(/ /g, "_"),
        description: description,
        galleryOrder: _galleries.size
      })
    })
    .then(res => res.json())
    .then(galleries => _updateGalleries(_galleries.push(new Gallery(galleries))));
  },

  onGalleryEdited(gallery) {
    // TODO: implement
  },

  onGalleryDeleted(galleryIndex) {
    var galleryId = _galleries.get(galleryIndex).galleryId;
    _updateGalleries(
      _galleries
        .delete(galleryIndex)
        .map((gal, index) => {
           return index >= galleryIndex ? gal.set('galleryOrder', gal.galleryOrder - 1) : gal
        })
    );
    var deleteAction = fetch(`/api/galleries/${galleryId}`, {
      credentials: 'include',
      method: 'delete'
    }).then(res => {
      var updateOrderPromises = _galleries.reduce((memo, gal, index) => {
        if (index >= galleryIndex) {
          memo.push(fetch(`/api/galleries/${gal.galleryId}`, {
            method: 'put',
            credentials: 'include',
            body: JSON.stringify(gal.toJS())
          }));
        }
        return memo;
      }, []);
      return Promise.all(updateOrderPromises);
    });
    return deleteAction;
  },

  onGalleryMoved(oldIndex, newIndex) {
    _updateGalleries(_galleries.map((gal, index) => {
      if (index == oldIndex) return _galleries.get(newIndex);
      else if (index == newIndex) return _galleries.get(oldIndex);
      else return gal;
    }));

    var galNew = _galleries.get(newIndex);
    var moveAction = fetch(`/api/galleries/${galNew.galleryId}`, {
      method: 'put',
      credentials: 'include',
      body: JSON.stringify(galNew.set('galleryOrder', newIndex).toJS())
    });

    var galOld  = _galleries.get(oldIndex);
    var moveReaction = fetch(`/api/galleries/${galOld.galleryId}`, {
      method: 'put',
      credentials: 'include',
      body: JSON.stringify(galOld.set('galleryOrder', oldIndex).toJS())
    });

    return Promise.all([moveAction, moveReaction]);
  },

  getInitialState() {
    return fetch('/api/galleries/')
      .then(res => res.json())
      .then(galleries => {
        return Promise.all(galleries.map(gallery => {
            return fetch(`/api/galleries/${gallery.galleryId}/pictures`)
              .then(res => res.json())
              .then(pictures => {
                gallery.pictures = List(
                  pictures
                    .sort((a, b) => parseInt(a.pictureOrder) - parseInt(b.pictureOrder))
                    .map(pic => new Picture(pic))
                )
                return new Gallery(gallery)
              })
        }))
      })
      .then(galleries => {
        _galleries = List(galleries.sort((a, b) => parseInt(a.galleryOrder) - parseInt(b.galleryOrder)))
        return _galleries
      })
  }
});

var _updateGalleries = galleries => {
  _galleries = galleries;
  CmsStore.trigger(_galleries);
};

module.exports = CmsStore;
