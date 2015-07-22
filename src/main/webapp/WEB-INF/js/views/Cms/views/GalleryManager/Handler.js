import React from 'react';
import Immutable  from 'immutable';
import mui from 'material-ui';

import GalleryCreator from './components/GalleryCreator';
import GalleryCard from './components/GalleryCard';

var GalleryManager = React.createClass({
  mixins: [
    require('react/addons').addons.PureRenderMixin
  ],

  propTypes: {
    galleries: React.PropTypes.instanceOf(Immutable.List).isRequired
  },

  render() {
    var galleryCount = this.props.galleries.size;
    var cardList = this.props.galleries.map((gallery, i) => {
      return (
        <GalleryCard gallery={gallery} galleryIndex={i} galleryCount={galleryCount} />
      );
    });
    return (
      <div id="gallery-manager">
        <div id="gallery-list">
          {cardList} 
        </div>
        <GalleryCreator />
      </div>
    );
  }
});

module.exports = GalleryManager;
