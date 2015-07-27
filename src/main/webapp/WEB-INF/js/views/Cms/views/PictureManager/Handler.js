import React from 'react';
import Immutable  from 'immutable';
import Reflux from 'reflux';
import { State } from 'react-router';

import PictureCreator from './components/PictureCreator';
import PictureCard from './components/PictureCard';
import PictureStore from 'stores/PictureStore';

var PictureManager = React.createClass({

  mixins: [
    require('react/addons').addons.PureRenderMixin,
    Reflux.listenTo(PictureStore, 'onPicturesChanged'),
    State
  ],

  componentDidMount() {
    PictureStore.getInitialState(this.getParams().galleryId).then(pictures => {
      if (this.isMounted()) {
        this.setState({pictures});
      }
    });
  },

  getInitialState() {
    return {
      pictures: Immutable.List([])
    };
  },
  onGalleriesChanged(galleries) {
    this.setState({pictures});
  },
  render() {
    var pictureCount = this.state.pictures.size;
    var cardList = this.state.pictures.map((picture, i) => {
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
