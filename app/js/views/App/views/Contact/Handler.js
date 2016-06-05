import React, { Component } from 'react'

class Contact extends Component {
  render () {
    return (
      <div>
      { Array(1000).fill(<span style={{ marginLeft: '4', marginRight: '4'}}>CONTACT</span>) }
      </div>
    )
  }
}

export default Contact
