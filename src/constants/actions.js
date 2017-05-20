import mirrorCreator from 'mirror-creator';

const Actions = mirrorCreator([
  'FETCHING_EVENTS', 'FETCH_EVENTS_SUCCESS', 'FETCH_EVENTS_ERROR'
]);

export default Actions;
