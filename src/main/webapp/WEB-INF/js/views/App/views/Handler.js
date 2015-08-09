import React from 'react';
import Reflux from 'reflux';
import Immutable from 'immutable';
import { RouteHandler, Navigation } from 'react-router';
import Gallery from 'stores/records/GalleryRecord';
import Picture from 'stores/records/PictureRecord';
//import GalleryStore from 'stores/GalleryStore';

var App = React.createClass({
  mixins: [
    Navigation,
    RouteHandler
  ],

  getInitialState() {
    var galleries = Immutable.List(
      initialGalleries.map(gallery => {
        pictures = Immutable.List(gal.pictures.map(picture => new Picture(picture)));
        gallery.pictures = pictures;
        return new Gallery(gallery);
      })
    );
    var defaultPicture = galleries.get(0).pictures.get(0);
    var galleries = galleries.delete(0);
    return {
      galleries,
      defaultPicture
    };
  }, 

  render() {
    return (
      <div id="app">
        <div id="sidenav">
          
        </div>
        <div id="gallery"

        </div>
      </div>
    );
  }
  
});

module.exports = App;
