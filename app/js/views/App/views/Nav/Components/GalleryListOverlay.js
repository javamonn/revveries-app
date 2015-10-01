import React from 'react'
import { List } from 'immutable'
import Radium from 'radium'
import { Link } from 'react-router'
import AppActions from 'actions/AppActions'
import RouteActions from 'actions/RouteActions'

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
          <Link to='gallery' params={{gallerySlug: gallery.slug}} style={styles.galleryContainer} onTouchTap={this.onNavigationy}>
            <div style={styles.galleryPreview(gallery.pictures.first().url)}></div>
          </Link>
          <Link to='gallery' params={{gallerySlug: gallery.slug}} style={styles.galleryLink} onTouchTap={this.onNavigation}>
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
        <ul style={styles.list}>
          {galleryListItems}
        </ul>
      </div>
    )
  }
}

var styles = {
  list: {
    listStyle: 'none',
    marginRight: '0',
    marginTop: '0',
    marginBottom: '0',
    fontWeight: '300',
    paddingLeft: '0',
    marginLeft: 'auto',
    backgroundColor: '#FFF',
    paddingTop: '73px',
    height: '100%',
    width: '350px',
    overflowY: 'scroll'
  },
  overlayFiller: {
    flex: '1'
  },
  listItem: {
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
    textDecoration: 'none'
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
    width: '350px',
    color: '#000',
    textDecoration: 'none',
    alignItems: 'stretch'
  }
}
