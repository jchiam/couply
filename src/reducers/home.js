import Actions from 'constants/actions';
import DataStates from 'constants/dataStates';

const initialState = {
  dataState: DataStates.Unfetched
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.FETCHING_EVENTS:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case Actions.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.events,
        dataState: DataStates.Fetched
      };
    case Actions.FETCH_EVENTS_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
}
