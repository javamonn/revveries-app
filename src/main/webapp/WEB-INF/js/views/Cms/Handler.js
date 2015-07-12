import React from 'react';
import Reflux from 'reflux';

import GalleryManager from 'views/Cms/components/GalleryManager';
import GalleryCreator from 'views/Cms/components/GalleryCreator';
import CmsStore from 'stores/CmsStore';
import mui from 'material-ui';

const ThemeManager = new mui.Styles.ThemeManager();
const AppBar = mui.AppBar;

var Cms = React.createClass({

  mixins: [Reflux.connect(CmsStore, "galleries")],
    
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
        <AppBar title={<h1 id="app-bar-title">Galleries</h1>} />
        <GalleryManager galleries={this.state.galleries} />
        <GalleryCreator />
      </div>
    )
  }
});

module.exports = Cms;
