import Actions from 'constants/actions';

import { firebaseDB } from 'firebaseUtils';

export function fetchEvents() {
  return (dispatch) => {
    dispatch({ type: Actions.FETCHING_EVENTS });

    firebaseDB.ref('/').once('value')
      .then(snapshot => snapshot.val())
      .then((dates) => {
        let events = [];
        Object.keys(dates).forEach(date => events.push({ ...dates[date], date }));
        dispatch({ type: Actions.FETCH_EVENTS_SUCCESS, events });
      });
  };
}
