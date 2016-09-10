import React, { Component } from 'react'
import Reflux from 'reflux'
import Radium from 'radium'
import AppStore from 'stores/AppStore'

var Info = React.createClass({

  mixins: [
    Reflux.listenTo(AppStore, 'onAppChanged')
  ],

  getInitialState () {
    return AppStore.getInitialState()
  },

  onAppChanged () {
    this.setState({
      info: appState.info
    })
  },

  render () {
    return (
      <div style={styles.base}>
        { this.state.info.pictures.size > 0
          ? (
            <div style={styles.imageContainer}>
              <img
                src={this.state.info.pictures.getIn([0, 'url'])}
                style={styles.image}
              />
            </div>
          )
          : null
        }
        <span style={styles.info}>
          {this.state.info.description}
        </span>
        <span style={styles.email}>
          <a href="mailto:revveries@gmail.com">revveries@gmail.com</a>
        </span>
        <div style={styles.socialContainer}>
          <a href="https://instagram.com/revveries" style={styles.socialLink}>
            <i style={styles.socialIcon} className="fa fa-instagram fa-lg" />
          </a>
          <a href="https://revveries.tumblr.com" style={styles.socialLink}>
            <i style={styles.socialIcon} className="fa fa-tumblr fa-lg" />
          </a>
        </div>
      </div>
    )
  }
})

const styles = {
  base: {
    '@media screen and (min-width: 1050px)': {
      paddingTop: '90',
    },
    '@media screen and (max-width: 1050px)': {
      paddingTop: '30'
    },
    paddingLeft: '30',
    paddingRight: '30',
    width: '100%',
    overflowY: 'scroll'
  },
  info: {
    display: 'block'
  },
  email: {
    display: 'block',
    marginTop: '16'
  },
  socialContainer: {
    marginTop: '20',
    marginBottom: '20'
  },
  socialIcon: {
    marginRight: '18'
  },
  socialLink: {
    textDecoration: 'none',
    color: '#000'
  },
  imageContainer: {
    marginBottom: '18'
  },
  image: {
    maxWidth: '100%'
  }
}

export default Radium(Info)
