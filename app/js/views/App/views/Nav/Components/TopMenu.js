import React from 'react'
import { List } from 'immutable'
import Radium from 'radium'
import { Link } from 'react-router'
import AppActions from 'actions/AppActions'
import RouteActions from 'actions/RouteActions'

@Radium
export default class TopMenu extends React.Component {

  constructor () {
    super()
  }

  render () {
    return (
      <div id='sidenav' style={styles.base}>
        <Link to='default' onTouchTap={RouteActions.routeChanged}>
          <h1 style={styles.header}>odette chavez-mayo</h1>
        </Link>
        <div style={styles.menuToggle} onTouchTap={AppActions.displayGalleryListOverlay}>
        </div>
      </div>
    )
  }
}

var styles = {
  header: {
    textAlign: 'center',
    fontWeight: '900',
    color: 'rgb(87, 16, 46)',
    marginTop: '20px',
    marginBottom: '20px',
    '@media screen and (min-width: 500px)': {
      fontSize: '26'
    },
    '@media screen and (max-width: 500px)': {
      fontSize: '18'
    }
  },
  menuToggle: {
    position: 'absolute',
    width: '22px',
    height: '22px',
    backgroundColor: 'black',
    borderRadius: '50%',
    zIndex: 20,
    '@media screen and (min-width: 500px)': {
      top: '28px',
      right: '28px'
    },
    '@media screen and (max-width: 500px)': {
      top: '28px',
      right: '28px'
    }
  },
  menuToggleIcon: {
    '@media screen and (min-width: 500px)': {
      fontSize: '30',
    },
    '@media screen and (max-width: 500px)': {
      fontSize: '22'
    },
    ':hover': {
      cursor: 'pointer'
    }
  }
}
