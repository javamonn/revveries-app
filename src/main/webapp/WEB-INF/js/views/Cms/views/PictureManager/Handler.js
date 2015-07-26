import React from 'react';
import Immutable  from 'immutable';

var PictureManager = React.createClass({
  mixins: [
    require('react/addons').addons.PureRenderMixin
  ],

  render() {
    return <div id="picture-manager"></div>
  }


});

module.exports = PictureManager;
