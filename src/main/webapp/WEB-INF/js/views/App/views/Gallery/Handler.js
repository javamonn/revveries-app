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
    console.log(this.state.gallery.toJS());
    var pictures = this.state.gallery.pictures.map(picture => {
      return (
        <li className="image">
          <img src={picture.url} />
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
