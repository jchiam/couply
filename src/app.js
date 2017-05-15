/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension, react/no-children-prop */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import * as firebase from 'firebase';

import store from 'store';
import routes from 'routes';

// check environment
const isProduction = process.env.NODE_ENV === 'production';

// initialize firebase
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID
};
firebase.initializeApp(config);

if (isProduction || !!module.hot) {
  ReactDOM.render(
    <Provider store={store}>
      <Router children={routes} history={createBrowserHistory()} />
    </Provider>,
    document.getElementById('accorde-root')
  );
} else {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router children={routes} history={createBrowserHistory()} key={Math.random()} />
      </Provider>
    </AppContainer>,
    document.getElementById('accorde-root')
  );
  module.hot.accept();
}
