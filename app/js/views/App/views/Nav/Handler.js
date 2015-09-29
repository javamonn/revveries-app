import React from 'react'
import { List } from 'immutable'
import Radium from 'radium'
import { Link } from 'react-router'
import SideMenu from './Components/SideMenu'
import TopMenu from './Components/TopMenu'

@Radium
export default class Nav extends React.Component {

  static propTypes = {
    galleries: React.PropTypes.instanceOf(List).isRequired
  }


  constructor () {
    super()
    var mq = window.matchMedia('screen and (max-width: 1050px)')
    mq.addListener(e => this.setState({ mobile: mq.matches }))
    this.state = {
      mobile: mq.matches,
    }
  }
  render () {
    if (this.state.mobile) {
      return <TopMenu galleries={this.props.galleries} />
    } else {
      return <SideMenu galleries={this.props.galleries} />
    }
  }
}
