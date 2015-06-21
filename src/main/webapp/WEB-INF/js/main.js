"use strict";

import React from 'react';
import Router, { Route, Link } from 'react-router';
import routes from 'routes';
import Sidenav from 'views/Sidenav/Handler';

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('app'));
});

React.render(<Sidenav />, document.getElementById('sidenav'));
