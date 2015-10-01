import Reflux from 'reflux'
import RouteActions from 'actions/RouteActions'

var RouteStore = Reflux.createStore({
  listenables: RouteActions,

  onRouteChanged () {
    this.trigger()
  }
})

module.exports = RouteStore
