import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import combinedReducer from 'reducers/combined_reducer';

const isProduction = process.env.NODE_ENV === 'production';

function generateStore() {
  return createStore(combinedReducer, applyMiddleware(thunkMiddleware));
}

function generateDevStore() {
  const logger = createLogger();
  return createStore(combinedReducer, applyMiddleware(thunkMiddleware, logger));
}

const store = isProduction ? generateStore() : generateDevStore();
export default store;
