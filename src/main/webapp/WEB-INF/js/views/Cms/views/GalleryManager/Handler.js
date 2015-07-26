import React from 'react';
import Immutable  from 'immutable';
import Reflux from 'reflux';

import GalleryCreator from './components/GalleryCreator';
import GalleryCard from './components/GalleryCard';
import CmsStore from 'stores/CmsStore';

var GalleryManager = React.createClass({

  mixins: [
    require('react/addons').addons.PureRenderMixin,
    Reflux.listenTo(CmsStore, 'onGalleriesChanged')
  ],

  componentDidMount() {
    CmsStore.getInitialState().then(galleries => {
      if (this.isMounted()) {
        this.setState({galleries});
      }
    });
  },

  getInitialState() {
    return {
      galleries: Immutable.List([])
    };
  },

  onGalleriesChanged(galleries) {
    this.setState({galleries});
  },

  render() {
    var galleryCount = this.state.galleries.size;
    var cardList = this.state.galleries.map((gallery, i) => {
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
