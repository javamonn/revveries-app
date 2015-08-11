import React from 'react';
import Reflux from 'reflux';
import Immutable from 'immutable';
import { RouteHandler, Link } from 'react-router';
import Gallery from 'stores/records/GalleryRecord';
import Picture from 'stores/records/PictureRecord';
import AppStore from 'stores/AppStore';

var App = React.createClass({
  mixins: [
    Navigation,
    RouteHandler
  ],

  getInitialState() {
    return AppStore.getInitialState();
  }, 

  render() {
    var sidenav = this.state.galleries.map(gallery => {
      return (
        <li className="sidenav-item">
          <Link to="gallery" params={{gallery.gallerySlug}}>gallery.galleryName</Link>
        </li>
      );
    });
    return (
      <div id="app">
        <div id="sidenav">
          <ul id="sidenav-list">
            {sidenav}
          </ul>
        </div>
        <div id="gallery">
          <RouteHandler />
        </div>
      </div>
    );
  }
  
});

module.exports = App;
