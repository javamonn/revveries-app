import React from 'react';

import mui from 'material-ui';
import Immutable from 'immutable';
import { RouteHandler } from 'react-router';

const ThemeManager = new mui.Styles.ThemeManager();
const AppBar = mui.AppBar;

var Cms = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.Object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    return (
      <div id="cms">
        <AppBar 
          title={<h1 id="app-bar-title">Galleries</h1>}
          style={{position: 'fixed'}}/>
        <RouteHandler />
      </div>
    )
  }
});

module.exports = Cms;
