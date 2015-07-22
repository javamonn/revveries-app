import Reflux from 'reflux';
import { List }  from 'immutable';

const CmsActions = require('../actions/CmsActions');
const Gallery = require('./records/GalleryRecord');

var _galleries = List([]);

var CmsStore = Reflux.createStore({
  listenables: CmsActions,

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

  onGalleryEdited(gallery) {

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
      method: 'delete'
    }).then(res => {
      var updateOrderPromises = _galleries.reduce((memo, gal, index) => {
        if (index >= galleryIndex) {
          memo.push(fetch(`api/galleries/${gal.galleryId}`, {
            method: 'put',
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
      body: JSON.stringify(galNew.set('galleryOrder', newIndex).toJS())
    });

    var galOld  = _galleries.get(oldIndex);
    var moveReaction = fetch(`/api/galleries/${galOld.galleryId}`, {
      method: 'put',
      body: JSON.stringify(galOld.set('galleryOrder', newIndex).toJS())
    });

    return Promise.all([moveAction, moveReaction]);
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
  _galleries = galleries;
  CmsStore.trigger(_galleries);
}

module.exports = CmsStore;
