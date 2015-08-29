import React from 'react';
import Reflux from 'reflux';
import AppStore from 'stores/AppStore';

var Index = React.createClass({
  getInitialState() {
    return {
      picture: AppStore.getInitialState().defaultPicture
    };
  },

  render() {
    return (
      <div id="index">
        <img src={this.state.picture.url} />
      </div>
    );
  }
});

module.exports = Index;
