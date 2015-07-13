import React from 'react';
import Reflux from 'reflux';

import GalleryList from 'views/Cms/components/GalleryList';
import GalleryCreator from 'views/Cms/components/GalleryCreator';
import CmsStore from 'stores/CmsStore';
import mui from 'material-ui';
import Immutable from 'immutable';

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
      console.log(galleries);
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
        <GalleryList galleries={this.state.galleries} />
        <GalleryCreator />
      </div>
    )
  }
});

module.exports = Cms;
