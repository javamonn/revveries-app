import React from 'react';
import Reflux from 'reflux';
import AppStore from 'stores/AppStore';
import { State } from 'react-router';

// TODO: Listen to app store to get lazily loaded images
var Gallery = React.createClass({
  mixins: [
    State
  ],

  getInitialState() {
    return {
      gallery: AppStore.getGalleryForSlug(this.getParams().gallerySlug)
    };
  },

  render() {
    return (
      <div id="gallery"></div>
    )
  }
});

module.exports = Gallery;
