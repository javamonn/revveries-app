import React from 'react'
import Reflux from 'reflux'
import { RouteHandler } from 'react-router'
import AppStore from 'stores/AppStore'
import PictureOverlay from 'views/App/views/Gallery/Components/PictureOverlay'
import GalleryListOverlay from 'views/App/views/Nav/Components/GalleryListOverlay'
import Nav from './Nav/Handler'

var App = React.createClass({

  mixins: [
    Reflux.listenTo(AppStore, 'onAppChanged')
  ],

  getInitialState () {
    return AppStore.getInitialState()
  },

  onAppChanged (appState) {
    this.setState({
      overlay: appState.overlay
    })
  },

  render () {
    var overlay
    if (this.state.overlay.visible && this.state.overlay.type === 'picture') {
      overlay = <PictureOverlay picture={this.state.overlay.picture} />
    } 
    else if (this.state.overlay.visible && this.state.overlay.type === 'galleryList') {
      overlay = <GalleryListOverlay galleries={this.state.galleries} /> 
    }
    return (
      <div id='app' className={this.state.overlay.visible ? 'overlay-visible' : ''}>
        <Nav galleries={this.state.galleries} />
        <div id='content'>
          <RouteHandler />
        </div>
        {overlay}
      </div>
    )
  }
})

module.exports = App
