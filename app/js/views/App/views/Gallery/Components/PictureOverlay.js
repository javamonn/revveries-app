import React from 'react'
import AppActions from 'actions/AppActions'
import PictureRecord from 'stores/records/PictureRecord'
import Radium from 'radium'

@Radium
class PictureOverlay extends React.Component {

  constructor () {
    super()
    this.propTypes = {
      picture: React.PropTypes.instanceOf(PictureRecord).isRequired
    }
  }

  _hideOverlay () {
    AppActions.hideOverlay()
  }

  render () {
    return (
      <div className='picture-overlay' onTouchTap={this._hideOverlay}>
        <div className='overlay-picture-container' style={[ getStyles(this.props.picture.url) ]} />
      </div>
    )
  }
}

var getStyles = imageUrl => ({
  backgroundImage: `url(${imageUrl})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  width: '100%',
  height: '100%'
})

module.exports = PictureOverlay
