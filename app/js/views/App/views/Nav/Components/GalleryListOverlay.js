import React from 'react'
import { List } from 'immutable'
import Radium from 'radium'
import { Link } from 'react-router'
import AppActions from 'actions/AppActions'
import RouteActions from 'actions/RouteActions'
var ReactCSSTransitionGroup = require('react/addons').addons.CSSTransitionGroup

@Radium
export default class GalleryListOverlay extends React.Component {
  static propTypes = {
    galleries: React.PropTypes.instanceOf(List).isRequired
  }

  constructor () {
    super()
  }

  onNavigation () {
    RouteActions.routeChanged()
    AppActions.hideOverlay()
  }

  render () {
    var galleryListItems = this.props.galleries.map(gallery => {
      return (
        <li key={'mobile-' + gallery.galleryId} style={styles.listItem}>
          <Link className="gallery-image-link" to='gallery' params={{gallerySlug: gallery.slug}} onTouchTap={this.onNavigation}>
            <div style={styles.galleryPreview(gallery.pictures.first().url)}></div>
          </Link>
          <Link className="gallery-title-link" to='gallery' params={{gallerySlug: gallery.slug}} style={styles.galleryLink} onTouchTap={this.onNavigation}>
            <h4 style={styles.galleryHeader}>
              {gallery.name}
            </h4>
          </Link>
        </li>
      )
    })
    return (
      <div id='menu-overlay' style={styles.overlayBackground}>
        <div onTouchTap={AppActions.hideOverlay} style={styles.overlayFiller} />
        <ReactCSSTransitionGroup transitionName='menu' transitionAppear={true} id='menu-transition'>
          <div key='gallery-list-overlay' id='gallery-list-overlay' style={styles.listContainer}>
            <div style={styles.metaContainer}>
              <span style={styles.metaDivider}>|</span>
              <Link to='info' onTouchTap={this.onNavigation} style={styles.metaLink}>
                <span>Info</span>
              </Link>
            </div>
            <ul style={styles.list}>
              {galleryListItems}
            </ul>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

var styles = {
  listContainer: {
    marginLeft: 'auto',
    backgroundColor: '#FFF',
    height: '100%',
    borderLeft: 'solid 1px #d3d3d3',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  list: {
    listStyle: 'none',
    marginRight: '0',
    marginTop: '0',
    marginBottom: '0',
    fontWeight: '300',
    paddingLeft: '0',
    marginLeft: 'auto',
    paddingTop: '30px'
  },
  overlayFiller: {
    flex: '1'
  },
  listItem:{
    marginBottom: '20'
  },
  galleryPreview: imageUrl => ({
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    width: '100%',
    height: '200'
  }),
  galleryHeader: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '300',
    textAlign: 'center',
    color: '#000',
    textDecoration: 'none',
    '@media screen and (max-width: 500px)': {
      marginTop: '10px',
      marginBottom: '10px'
    }
  },
  galleryLink: {
    color: '#000',
    textDecoration: 'none'
  },
  overlayBackground: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, .7)',
    display: 'flex'
  },
  galleryContainer: {
    display: 'inline-block',
    '@media screen and (max-width: 500px)': {
      width: '350px',
    },
    '@media screen and (min-width: 500px)': {
      width: '100%'
    },
    color: '#000',
    textDecoration: 'none',
    alignItems: 'stretch'
  },
  metaContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '30'
  },
  metaLink: {
    width: '100%',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#000'
  },
}
