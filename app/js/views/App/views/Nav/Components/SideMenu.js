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
          <Link to='gallery' params={{ gallerySlug: gallery.slug }} onTouchTap={RouteActions.routeChanged}>{ gallery.name }</Link>
        </li>
      )
    })

    return (
      <div id='sidenav' style={[ styles.base ]}>
        <Link to='default' onTouchTap={RouteActions.routeChanged}>
          <h1 style={[ styles.header ]}>ODETTE CHAVEZ-MAYO</h1>
        </Link>
        <ul key='desktop-galleries' style={[ styles.list ]}>
          {galleryListItems}
        </ul>
      </div>
    )
  }
}

var styles = {
  base: {
    display: 'inline-block',
    paddingLeft: '30',
    paddingRight: '30',
    paddingTop: '30',
  },
  header: {
    fontWeight: '300',
    marginTop: '0',
    fontSize: '22'
  },
  list: {
    listStyle: 'none',
    margin: '0',
    fontWeight: '300',
    paddingLeft: '0',
  },
  listItem: {
    marginBottom: '10',
  }
}
