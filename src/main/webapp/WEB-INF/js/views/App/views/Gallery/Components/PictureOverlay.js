import React from 'react';
import Reflux from 'reflux';
import AppActions from 'actions/AppActions';

var PictureOverlay = React.createClass({

  _hideOverlay() {
    AppActions.hideOverlay();
  },

  render() {
    return (
      <div className="picture-overlay" onTouchTap={this._hideOverlay}>
        <img src={this.props.picture.url} />
      </div>
    );
  }
});

module.exports = PictureOverlay;
