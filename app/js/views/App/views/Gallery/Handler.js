import React from 'react'
import AppStore from 'stores/AppStore'
import { State } from 'react-router'
import AppActions from 'actions/AppActions'
import Radium from 'radium'

var Gallery = React.createClass({

  mixins: [
    State
  ],

  getInitialState () {
    var mq = window.matchMedia('screen and (max-width: 1050px)')

    // update state on breakpoint
    mq.addListener(mq => {
      this.setState({
        mobile: mq.matches
      })
    })

    // update state on resize
    window.addEventListener('resize', e => {
      this.setState({
        windowWidth: window.innerWidth
      })
    })

    return {
      gallery: AppStore.getGalleryForSlug(this.getParams().gallerySlug),
      overlay: {
        visible: false,
        picture: undefined
      },
      windowWidth: window.innerWidth,
      mobile: mq.matches
    }
  },

  _displayOverlay (picture) {
    AppActions.displayOverlay(picture)
  },

  render () {
    var pictures = this.state.gallery.pictures.map(picture => {
      if (this.state.mobile) {
        return (
          <li 
            style={[ styles.mobile(picture, this.state.windowWidth) ]} 
            onTouchTap={ this._displayOverlay.bind(this, picture) } >
          </li>
        )
      } else {
        return (
          <li style={[ styles.desktop ]}>
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
      <div id='gallery'>
        <ul>{pictures}</ul>
      </div>
    )
  }
})

var styles = {
  mobile: (picture, windowWidth) => ({
    backgroundImage: `url(${picture.url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    height: '100%',
    width: `${Math.min(windowWidth - 30, picture.width)}`,
    display: 'inline-block',
    flex: '0 0 auto',
    marginLeft: '15',
    marginRight: '15'
  }),
  desktop: {
    display: 'inline-block',
    marginRight: '20',
    height: '100%'
  }
}

module.exports = Radium(Gallery)
