import React from 'react'
import Radium from 'radium'
import AppStore from 'stores/AppStore'

@Radium
class Index extends React.Component {
  constructor () {
    super()
    this.state = {
      picture: AppStore.getInitialState().defaultPicture
    }
  }

  render () {
    return (
      <div id='index' style={[ getStyles(this.state.picture.url) ]}/>
    )
  }
}

var getStyles = imageUrl => ({
  backgroundImage: `url(${imageUrl})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundOrigin: 'content-box',
  width: '100%',
  height: '100%',
  '@media screen and (min-width: 1350px)': {
    height: '80%',
    margin: 'auto'
  },
  '@media screen and (min-width: 1050px) and (max-width: 1350px)': {
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '75px',
    paddingBottom: '75px'
  },
  '@media screen and (min-width: 600px) and (max-width: 1050px)': {
    padding: '36px'
  }, 
  '@media screen and (min-width: 400px) and (max-width: 600px)': {
    padding: '12px'
  },
  '@media screen and (max-width: 400px)': {
    padding: '6px'
  }
})

module.exports = Index
