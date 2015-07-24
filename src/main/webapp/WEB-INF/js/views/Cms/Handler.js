import React from 'react';
import Reflux from 'reflux';

import CmsStore from 'stores/CmsStore';
import mui from 'material-ui';
import Immutable from 'immutable';

import GalleryManager from './views/GalleryManager/Handler';

const ThemeManager = new mui.Styles.ThemeManager();
const AppBar = mui.AppBar;

var Cms = React.createClass({

  mixins: [
    require('react/addons').addons.PureRenderMixin,
    Reflux.listenTo(CmsStore, 'onGalleriesChanged')
  ],

  getInitialState() {
    return {
      galleries: Immutable.List([])
    }
  },

  componentDidMount() {
    CmsStore.getInitialState().then(galleries => {
      if (this.isMounted()) {
        this.setState({galleries});
      }
    });
  },

  onGalleriesChanged(galleries) {
    this.setState({galleries});
  },
    
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
      </div>
    )
  }
});

module.exports = Cms;
