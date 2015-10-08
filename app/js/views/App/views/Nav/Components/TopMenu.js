import React from 'react'
import { List } from 'immutable'
import Radium from 'radium'
import { Link } from 'react-router'
import AppActions from 'actions/AppActions'

@Radium
export default class TopMenu extends React.Component {

  constructor () {
    super()
  }
  
  render () {
    return (
      <div id='sidenav' style={styles.base}>
        <h1 style={styles.header}>ODETTE CHAVEZ-MAYO</h1>
        <div style={styles.menuToggle} onTouchTap={AppActions.displayGalleryListOverlay}>
          <i style={styles.menuToggleIcon}  className="material-icons">menu</i>
        </div>
      </div>
    )
  }
}

var styles = {
  header: {
    textAlign: 'center',
    fontWeight: '400',
    marginTop: '20px',
    marginBottom: '20px',
    '@media screen and (min-width: 500px)': {
      fontSize: '28'
    },
    '@media screen and (max-width: 500px)': {
      fontSize: '18'
    }
  },
  menuToggle: {
    position: 'absolute',
    '@media screen and (min-width: 500px)': {
      top: '20px',
      right: '20px'
    },
    '@media screen and (max-width: 500px)': {
      top: '20px',
      right: '20px'
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
