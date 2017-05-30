import { combineReducers } from 'redux';
import home from 'reducers/home';
import timeline from 'reducers/timeline';
import auth from 'reducers/auth';

const combinedReducer = combineReducers({
  home,
  timeline,
  auth
});

export default combinedReducer;
