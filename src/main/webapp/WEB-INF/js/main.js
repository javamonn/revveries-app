"use strict";

import React from 'react';
import Router, { Route, Link } from 'react-router';
import routes from 'routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('app'));
});
