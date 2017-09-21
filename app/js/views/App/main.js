import React from 'react';
import Router, { Route, DefaultRoute, Link } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './views/Handler';
import Gallery from './views/Gallery/Handler';
import Index from './views/Index/Handler';
import Info from './views/Info/Handler';

injectTapEventPlugin();

var routes = (
  <Route path='/' handler={App}>
    <DefaultRoute name='default' handler={Index} />
    <Route name='about' path='/about' handler={Info} />
    <Route name='gallery' path='/:gallerySlug' handler={Gallery} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('app-section'));
});
