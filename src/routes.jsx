import React from 'react';
import { Switch, Route } from 'react-router';

import App from 'components/app';
import Home from 'pages/home';

export default(
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </App>
);
