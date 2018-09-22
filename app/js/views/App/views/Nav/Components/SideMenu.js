import React from 'react'
import { List } from 'immutable'
import Radium from 'radium'
import { Link } from 'react-router'
import RouteActions from 'actions/RouteActions'

@Radium
export default class SideMenu extends React.Component {

  static propTypes = {
    galleries: React.PropTypes.instanceOf(List).isRequired
  }

  constructor () {
    super()
  }

  render () {
    var galleryListItems = this.props.galleries.map(gallery => {
      return (
        <li key={'desktop-' + gallery.galleryId} className='sidenav-item' style={[ styles.listItem ]}>
          <Link
            to='gallery'
            params={{ gallerySlug: gallery.slug }}
            onTouchTap={RouteActions.routeChanged}>
              { gallery.name }
          </Link>
        </li>
      )
    })

    return (
      <div id='sidenav' style={[ styles.base ]}>
        <div style={styles.sidenavContainer}>
          <Link to='default' onTouchTap={RouteActions.routeChanged}>
            <h1 style={[ styles.header ]}>odette chavez-mayo</h1>
          </Link>
          <ul key='desktop-galleries' style={[ styles.list ]}>
            {galleryListItems}
          </ul>
          <div className='sidenav-item' style={styles.metaContainer}>
            <Link to='about'>
              <span>about</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
    display: 'inline-block',
  },
  header: {
    fontWeight: '900',
    color: 'rgb(87, 16, 46)',
    marginTop: '0',
    fontSize: '26',
    marginBottom: '30'
  },
  list: {
    listStyle: 'none',
    margin: '0',
    fontWeight: '300',
    paddingLeft: '0',
    display: 'flex',
    flexDirection: 'column',
  },
  listItem: {
    marginBottom: '10',
  },
  metaContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '30',
    marginBottom: '95'
  },
  sidenavContainer: {
    display: 'flex',
    paddingLeft: '40',
    paddingRight: '0',
    paddingTop: '30',
    flexDirection: 'column',
    height: '100%'
  }
}
