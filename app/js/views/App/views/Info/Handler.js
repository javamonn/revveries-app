import React, { Component } from 'react'
import Radium from 'radium'

@Radium
class Info extends Component {
  render () {
    return (
      <div style={styles.base}>
        <span style={styles.info}>
          20 yr old photographer living in Yellow Springs, Ohio and studying at Antioch College. I like to take photos.
        </span>
        <span style={styles.email}>
          <a href="mailto:revveries@gmail.com">revveries@gmail.com</a>
        </span>
        <div style={styles.socialContainer}>
          <a href="/" style={styles.socialLink}>
            <i style={styles.socialIcon} className="fa fa-instagram fa-lg" />
          </a>
          <a href="/" style={styles.socialLink}>
            <i style={styles.socialIcon} className="fa fa-tumblr fa-lg" />
          </a>
          <a href="/" style={styles.socialLink}>
            <i style={styles.socialIcon} className="fa fa-twitter fa-lg" />
          </a>
          <a href="/" style={styles.socialLink}>
            <i style={styles.socialIcon} className="fa fa-facebook fa-lg" />
          </a>
        </div>
      </div>
    )
  }
}

const styles = {
  base: {
    '@media screen and (min-width: 1050px)': {
      paddingTop: '90',
    },
    '@media screen and (max-width: 1050px)': {
      paddingTop: '30'
    },
    paddingLeft: '30',
    paddingRight: '30'
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
  },
  socialIcon: {
    marginRight: '18'
  },
  socialLink: {
    textDecoration: 'none',
    color: '#000'
  }
}

export default Info
