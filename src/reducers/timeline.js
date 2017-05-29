import Actions from 'constants/actions';
import DataStates from 'constants/dataStates';

const initialState = {
  albums: [],
  dataState: DataStates.Unfetched
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.FETCHING_ALBUMS:
      return {
        ...state,
        dataState: DataStates.Fetching
      };
    case Actions.FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.albums.slice(0),
        dataState: DataStates.Fetched
      };
    case Actions.FETCH_ALBUMS_ERROR:
      return {
        ...state,
        dataState: DataStates.Error
      };
    default:
      return state;
  }
}
