import React from 'react'
import AppActions from 'actions/AppActions'
import PictureRecord from 'stores/records/PictureRecord'

var PictureOverlay = React.createClass({

  propTypes: {
    picture: React.PropTypes.instanceOf(PictureRecord).isRequired
  },

  _hideOverlay () {
    AppActions.hideOverlay()
  },

  render () {
    return (
      <div className='picture-overlay' onTouchTap={this._hideOverlay}>
        <div className='overlay-picture-container' style={{
          width: '90%',
          height: '90%',
          backgroundImage: `url(${this.props.picture.url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }} />
      </div>
    )
  }
})

module.exports = PictureOverlay
