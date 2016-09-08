import React, { Component } from 'react'

class Info extends Component {
  render () {
    return (
      <div>
      { Array(1000).fill(<span style={{ marginLeft: '4', marginRight: '4'}}>ODETTE CHAVEZ-MAYO</span>) }
      </div>
    )
  }
}

export default Info
