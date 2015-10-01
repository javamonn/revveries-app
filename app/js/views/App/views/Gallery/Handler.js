import React from 'react'
import AppStore from 'stores/AppStore'
import RouteStore from 'stores/RouteStore'
import { State } from 'react-router'
import AppActions from 'actions/AppActions'
import Radium from 'radium'
import { Map } from 'immutable'
import Reflux from 'reflux'

var Gallery = React.createClass({

  mixins: [
    State,
    Reflux.listenTo(RouteStore, 'onRouteChanged')
  ],

  getInitialState () {
    var mq = window.matchMedia('screen and (max-width: 1050px)')

    var gallery = AppStore.getGalleryForSlug(this.getParams().gallerySlug)
    return {
      gallery: gallery,
      overlay: {
        visible: false,
        picture: undefined
      },
      mobile: mq.matches,
      renderedWidthById: this.computeRenderedWidth(gallery.pictures)
    }
  },

  computeRenderedWidth (pictures) {
    var marginSize = 20
    var ww = window.innerWidth
    var elem = document.getElementById('pictures-container')
    return Map(pictures.reduce(
      (memo, picture) => {
        if (elem && picture.height > elem.clientHeight) {
          var renderedWidth = (elem.clientHeight / picture.height) * picture.width
          if (renderedWidth === ww) {
            renderedWidth -= marginSize
          }
          memo[String(picture.pictureId)] = Math.min(renderedWidth, ww - marginSize)
        } else {
          memo[String(picture.pictureId)] = Math.min(ww - marginSize, picture.width)
        }
        return memo
      }, {})
    )
  },

  componentDidMount () {
    this.setState({
      renderedWidthById: this.computeRenderedWidth(this.state.gallery.pictures)
    })
    // update state on resize
    window.addEventListener('resize', e => {
      // TODO: debounce e
      if (this.isMounted()) {
        this.setState({
          renderedWidthById: this.computeRenderedWidth(this.state.gallery.pictures)
        })
      }
    })
  },

  onRouteChanged () {
    var gallery = AppStore.getGalleryForSlug(this.getParams().gallerySlug)
    this.setState({
      gallery: gallery,
      renderedWidthById: this.computeRenderedWidth(gallery.pictures)
    })
  },

  _displayOverlay (picture) {
    AppActions.displayPictureOverlay(picture)
  },

  render () {
    var pictures = this.state.gallery.pictures.map(picture => {
      if (this.state.mobile) {
        return (
          <li
            key={picture.pictureId}
            style={[ styles.mobile(picture, this.state.renderedWidthById.get(String(picture.pictureId))) ]}
            onTouchTap={ this._displayOverlay.bind(this, picture) } >
          </li>
        )
      } else {
        return (
          <li key={picture.pictureId} style={[ styles.desktop ]}>
            <img
              src={picture.url}
              onTouchTap={this._displayOverlay.bind(this, picture)}
              style={{ height: '100%' }} >
            </img>
          </li>
        )
      }
    })
    return (
      <div id='gallery' ref='gallery'>
        <ul id='pictures-container'>{pictures}</ul>
      </div>
    )
  }
})

var styles = {
  mobile: (picture, renderedWidth) => ({
    backgroundImage: `url(${picture.url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    width: `${renderedWidth}`,
    display: 'inline-block',
    flex: '0 0 auto',
    marginLeft: '10',
    marginRight: '10'
  }),
  desktop: {
    display: 'inline-block',
    marginRight: '20',
    height: '100%'
  }
}

module.exports = Radium(Gallery)
