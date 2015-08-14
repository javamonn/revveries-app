import React from 'react';
import Reflux from 'reflux';
import { RouteHandler, Link } from 'react-router';
import Gallery from 'stores/records/GalleryRecord';
import Picture from 'stores/records/PictureRecord';
import AppStore from 'stores/AppStore';

var App = React.createClass({

  getInitialState() {
    return AppStore.getInitialState();
  }, 

  render() {
    var sidenav = this.state.galleries.map(gallery => {
      return (
        <li className="sidenav-item">
          <Link to="gallery" params={{gallerySlug: gallery.slug}}>{gallery.name}</Link>
        </li>
      );
    });
    return (
      <div id="app">
        <div id="sidenav">
          <h1>Odette Chavez-Mayo</h1>
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
