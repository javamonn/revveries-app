import React from 'react';
import Reflux from 'reflux';
import AppStore from 'stores/AppStore';
import { State } from 'react-router';
import PictureOverlay from './Components/PictureOverlay';

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

  _onImageFocus(picture) {
    console.log(picture);
    this.setState({
      overlay: {
        visible: true,
        picture: picture
      }
    });
  },

  render() {
    var pictures = this.state.gallery.pictures.map(picture => {
      return (
        <li className="image">
          <img src={picture.url} onTouchTap={this._onImageFocus.bind(this, picture)} />
        </li>
      );
    });
    var overlay;
    if (this.state.overlay.visible) {
      overlay = (
        <PictureOverlay image={this.state.overlay.picture} />
      );
    }
    return (
      <div id="gallery">
        <ul>{pictures}</ul>
        {overlay}
      </div>
    );
  }
});

module.exports = Gallery;
