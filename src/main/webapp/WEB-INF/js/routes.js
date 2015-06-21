import React from 'react';
import Gallery from 'views/Gallery/Handler';
import App from 'views/App/Handler';
import { Route, DefaultRoute } from 'react-router';

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Gallery} />
  </Route>
);
console.log('routes');

module.exports = routes;
