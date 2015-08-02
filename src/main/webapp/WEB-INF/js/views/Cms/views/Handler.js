import React from 'react';
import Reflux from 'reflux';
import Immutable from 'immutable';
import { RouteHandler } from 'react-router';
import StateStore from 'stores/StateStore';
const ThemeManager = new mui.Styles.ThemeManager();
import mui, {
  AppBar,
  IconButton
} from 'material-ui';

var Cms = React.createClass({

  mixins: [
    Reflux.listenTo(StateStore, 'onStateChanged')
  ],

  childContextTypes: {
    muiTheme: React.PropTypes.Object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  onStateChanged(stateInfo) {
    this.setState({ stateInfo });
  },

  getInitialState() {
    return {
      stateInfo: StateStore.getInitialState()
    };
  },

  render() {
    var appBar;
    if (this.state.stateInfo.name == 'galleries') {
      appBar = (
        <AppBar 
          title={<h1 id="app-bar-title">Galleries</h1>}
          showMenuIconButton={false}
          style={{position: 'fixed'}}>
        </AppBar>
      );
    } else {
      appBar = (
        <AppBar
          title={<h1 id="app-bar-title">{this.state.stateInfo.title}</h1>}
          style={{position: 'fixed'}}
          iconElementLeft={<IconButton iconClassName="material-icons">keyboard_backspace</IconButton>}>
        </AppBar>
      );
    }
    return (
      <div id="cms">
        {appBar}
        <RouteHandler />
      </div>
    )
  }
});

module.exports = Cms;
