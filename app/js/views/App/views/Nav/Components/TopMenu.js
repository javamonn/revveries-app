import React from 'react'
import { List } from 'immutable'
import Radium from 'radium'
import { Link } from 'react-router'

@Radium
export default class TopMenu extends React.Component {

  static propTypes = {
    galleries: React.PropTypes.instanceOf(List).isRequired
  }

  constructor () {
    super()
    this.state = {
      menuOverlayVisible: false
    }
    this.displayMenuOverlay = this.displayMenuOverlay.bind(this)
  }

  displayMenuOverlay () {
    console.log('displaying menu overlay')
    this.setState({
      menuOverlayVisible: true
    })
  }
  
  render () {
    var menuOverlay
    if (this.state.menuOverlayVisible) {
      var galleryListItems = this.props.galleries.map(gallery => {
        return (
          <li key={'mobile-' + gallery.galleryId} style={styles.listItem}>
            <Link to='gallery' params={{galleryslug: gallery.slug}}>
              <div style={styles.galleryPreview(gallery.pictures.first().url)}></div>
              <h4 style={styles.galleryHeader}>
                {gallery.title}
              </h4>
            </Link>
          </li>
        )
      })
      menuOverlay = (
        <div id='menu-overlay' style={styles.overlayBackground}>
          <ul style={styles.list}>
            {galleryListItems}
          </ul>
        </div>
      )
    }
    return (
      <div id='sidenav' style={styles.base}>
        <h1 style={styles.header}>Odette Chavez-Mayo</h1>
        <div style={styles.menuToggle} onTouchTap={this.displayMenuOverlay}>
          <i style={styles.menuToggleIcon}  className="material-icons">menu</i>
        </div>
        {menuOverlay}
      </div>
    )
  }
}

var styles = {
  galleryPreview: imageUrl => ({
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    width: '100%'
  }),
  galleryHeader: {
    textAlign: 'right'
  },
  header: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: '28',
    marginTop: '20px',
    marginBottom: '20px'
  },
  listItem: {

  },
  menuToggle: {
    position: 'absolute',
    top: '20px',
    right: '20px'
  },
  menuToggleIcon: {
    fontSize: '30',
    ':hover': {
      cursor: 'pointer'
    }
  }
}
