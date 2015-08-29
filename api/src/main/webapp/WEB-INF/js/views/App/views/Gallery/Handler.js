import React from 'react';
import Reflux from 'reflux';
import AppStore from 'stores/AppStore';
import { State } from 'react-router';
import AppActions from 'actions/AppActions';

// TODO: Listen to app store to get lazily loaded images
var Gallery = React.createClass({
  mixins: [
    State
  ],

  getInitialState() {
    return {
      gallery: AppStore.getGalleryForSlug(this.getParams().gallerySlug),
      overlay: {
        visible: false,
        picture: undefined
      }
    };
  },

  _displayOverlay(picture) {
    AppActions.displayOverlay(picture);
  },

  render() {
    var pictures = this.state.gallery.pictures.map(picture => {
      return (
        <li className="image">
          <img src={picture.url} onTouchTap={this._displayOverlay.bind(this, picture)} />
        </li>
      );
    });
    return (
      <div id="gallery">
        <ul>{pictures}</ul>
      </div>
    );
  }
});

module.exports = Gallery;
