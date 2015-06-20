import Gallery from 'views/Gallery/Handler'

var routes = (
  <Route handler={App}>
    <Route path="/" handler={Gallery}></Route>
  </Route>
);

module.exports = routes;
