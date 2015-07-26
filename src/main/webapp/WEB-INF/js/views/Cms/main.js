"use strict";

import React from 'react';
import Router, { Route, DefaultRoute, Link } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Cms from './views/Handler';
import GalleryManager from './views/GalleryManager/Handler';
import PictureManager from './views/PictureManager/Handler';

injectTapEventPlugin();

var routes = (
  <Route path="/" handler={Cms}>
    <DefaultRoute handler={GalleryManager} />
    <Route name=':galleryId/pictures' handler={PictureManager} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('cms'));
});
