/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension, react/no-children-prop */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from 'store';
import routes from 'routes';

// needed for onTouchTap
injectTapEventPlugin();

// check environment
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction || !module.hot) {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router children={routes} history={createHistory()} />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('accorde-root')
  );
} else {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Provider store={store}>
          <Router children={routes} history={createHistory()} key={Math.random()} />
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('accorde-root')
  );
  module.hot.accept();
}
