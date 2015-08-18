import React from 'react';
import Reflux from 'reflux';

var PictureOverlay = React.createClass({
  render() {
    return (
      <div className="picture-overlay">
        <img src={this.props.picture.url} />
      </div>
    );
  }
});

module.exports = PictureOverlay;
