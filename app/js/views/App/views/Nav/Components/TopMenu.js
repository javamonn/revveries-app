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
        <h1 style={styles.header}>Odette Chavez-Mayo</h1>
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
    fontSize: '28',
    marginTop: '20px',
    marginBottom: '20px'
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
