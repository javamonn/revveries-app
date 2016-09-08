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
    Reflux.listenTo(RouteStore, 'onRouteChanged'),
    Reflux.listenTo(AppStore, 'onAppChanged')
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

    // focus the gallery
    if (this.refs.gallery) {
      this.refs.gallery.getDOMNode().focus()
      this._focusListener = this.refs.gallery.getDOMNode().addEventListener('blur', () => {
        var elem = this.refs.gallery.getDOMNode()
        if (elem) elem.focus()
      })
    }
  },

  componentWillUnmount () {
    if (this._focusListener) {
      this.refs.gallery.getDOMNode().removeEventListener('blur', this._focusListener)
    }
  },

  onRouteChanged () {
    var gallery = AppStore.getGalleryForSlug(this.getParams().gallerySlug)
    this.setState({
      gallery: gallery,
      renderedWidthById: this.computeRenderedWidth(gallery.pictures)
    })
  },

  onAppChanged (appState) {
    this.setState({ overlay: appState.overlay })
  },

  _displayOverlay (picture) {
    AppActions.displayPictureOverlay(picture)
  },

  _onKeyDown (ev) {
    if (this.state.overlay.visible && this.state.overlay.type === 'picture') {
      var currentIdx = this.state.overlay.picture.get('pictureOrder')
      if (ev.key === 'ArrowLeft') {
        ev.preventDefault()
        var picture = this.state.gallery.pictures.get(Math.max(currentIdx - 1, 0))
        AppActions.displayPictureOverlay(picture)
      } else if (ev.key === 'ArrowRight') {
        ev.preventDefault()
        var picture = this.state.gallery.pictures.get(Math.min(currentIdx + 1, this.state.gallery.pictures.size - 1))
        AppActions.displayPictureOverlay(picture)
      }
    }
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
          <li
            key={picture.pictureId}
            style={[ styles.desktop ]}>
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
      <div
        tabIndex={-1}
        id='gallery'
        ref='gallery'
        onKeyDown={this._onKeyDown}>
        <ul id='pictures-container'>
          {pictures}
        </ul>
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
    marginRight: '10',
    cursor: 'pointer'
  }),
  desktop: {
    display: 'inline-block',
    marginRight: '20',
    height: '100%',
    cursor: 'pointer'
  }
}

module.exports = Radium(Gallery)
