import { Router, Route, Link } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import React from 'react';
import routes from 'routes';

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('app'));
});
