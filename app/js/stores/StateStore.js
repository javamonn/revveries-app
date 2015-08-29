import Reflux from 'reflux';
import StateActions from '../actions/StateActions';

var _stateInfo;

var StateStore = Reflux.createStore({
  listenables: StateActions,

  onTransitionToPictures(galleryName) {
    _stateInfo = {
      name: 'pictures',
      title: galleryName
    };
    this.trigger(_stateInfo);
  },

  onTransitionToGalleries() {
    _stateInfo = {
      name: 'galleries'
    };
    this.trigger(_stateInfo);
  },

  init(initialStateInfo) {
    _stateInfo = initialStateInfo
    this.trigger(_stateInfo);
  }, 

  getInitialState() {
    return {
      name: 'galleries'
    };
  }
});

module.exports = StateStore;
