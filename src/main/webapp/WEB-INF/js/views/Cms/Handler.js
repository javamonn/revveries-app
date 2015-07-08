import React from 'react';
import GalleryManager from 'views/Cms/components/GalleryManager';
import PictureManager from 'views/Cms/components/PictureManager';

var Cms = React.createClass({
  render() {
    return (
      <div id="cms">
        <GalleryManager />
        <PictureManager />
      </div>
    )
  }
});

module.exports = Cms;
