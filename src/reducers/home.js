import DataStates from 'constants/dataStates';

const initialState = {
  dataState: DataStates.Unfetched
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
