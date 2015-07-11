import React from 'react';
import Reflux from 'reflux';

import GalleryManager from 'views/Cms/components/GalleryManager';
import PictureManager from 'views/Cms/components/PictureManager';
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
        <AppBar title="Galleries" />
        <GalleryManager galleries={this.state.galleries} />
      </div>
    )
  }
});

module.exports = Cms;
