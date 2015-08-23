import React from 'react';
import Reflux from 'reflux';
import { RouteHandler, Link } from 'react-router';
import Gallery from 'stores/records/GalleryRecord';
import Picture from 'stores/records/PictureRecord';
import AppStore from 'stores/AppStore';
import PictureOverlay from 'views/App/views/Gallery/Components/PictureOverlay';

var App = React.createClass({

  mixins: [ 
    Reflux.listenTo(AppStore, 'onAppChanged') 
  ],

  getInitialState() {
    return AppStore.getInitialState();
  }, 

  onAppChanged(appState) {
    this.setState({
      overlay: appState.overlay
    });
  },

  render() {
    var sidenav = this.state.galleries.map(gallery => {
      return (
        <li className="sidenav-item">
          <Link to="gallery" params={{gallerySlug: gallery.slug}}>{gallery.name}</Link>
        </li>
      );
    });
    var overlay;
    if (this.state.overlay.visible) {
      overlay = (
        <PictureOverlay picture={this.state.overlay.picture} />
      );
    }
    return (
      <div id="app" className={this.state.overlay.visible ? 'overlay-visible' : ''}>
        <div id="sidenav">
          <h1>Odette Chavez-Mayo</h1>
          <ul>{sidenav}</ul>
        </div>
        <div id="content">
          <RouteHandler />
        </div>
        {overlay}
      </div>
    );
  }
  
});

module.exports = App;
