import React from 'react';
import Immutable  from 'immutable';
import Reflux from 'reflux';
import StateActions from 'actions/StateActions';
import { State } from 'react-router';
import PictureCreator from './components/PictureCreator';
import PictureCard from './components/PictureCard';
import PictureStore from 'stores/PictureStore';
import Gallery from 'stores/records/GalleryRecord';

var PictureManager = React.createClass({

  mixins: [
    require('react/addons').addons.PureRenderMixin,
    Reflux.listenTo(PictureStore, 'onPicturesChanged'),
    State
  ],

  componentDidMount() {
    PictureStore.getInitialState(parseInt(this.getParams().galleryId))
      .then(gallery => {
        if (this.isMounted()) {
          this.setState({gallery});
          console.log(gallery.toJS());
          StateActions.transitionToPictures(gallery.name);
        }
      });
  },

  getInitialState() {
    return {
      gallery: new Gallery()
    };
  },

  onPicturesChanged(gallery) {
    this.setState({gallery});
  },

  render() {
    var pictureCount = this.state.gallery.pictures.size;
    var cardList = this.state.gallery.pictures.map((picture, i) => {
      return (
        <PictureCard picture={picture} pictureIndex={i} pictureCount={pictureCount} />
      );
    });
    return (
      <div id="picture-manager">
        <div id="picture-list">
          {cardList} 
        </div>
        <PictureCreator />
      </div>
    )
  }
});

module.exports = PictureManager;
