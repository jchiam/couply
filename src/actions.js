import Actions from 'constants/actions';
import * as async from 'async';

import { firebaseDB, firebaseStorage } from 'firebaseUtils';

export function fetchEvents() {
  console.log('fetch start');
  return (dispatch) => {
    console.log('fetching');
    dispatch({ type: Actions.FETCHING_EVENTS });

    async.waterfall([
      cb => firebaseDB.ref('/').once('value').then(snapshot => cb(null, snapshot.val())),
      (dates, cb) => {
        let events = [];
        Object.keys(dates).forEach(date => events.push({ ...dates[date], date }));
        cb(null, events);
      }
    ], (err, events) => {
      dispatch({ type: Actions.FETCH_EVENTS_SUCCESS, events });
    });
  };
}
