import React from 'react';
import { Switch, Route } from 'react-router';

import App from 'components/app';
import Home from 'pages/home';
import Timeline from 'pages/timeline';

export default(
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/timeline" component={Timeline} />
    </Switch>
  </App>
);
