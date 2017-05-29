import { combineReducers } from 'redux';
import home from 'reducers/home';
import timeline from 'reducers/timeline';

const combinedReducer = combineReducers({
  home,
  timeline
});

export default combinedReducer;
