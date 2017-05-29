import mirrorCreator from 'mirror-creator';

const Actions = mirrorCreator([
  'FETCHING_ALBUMS', 'FETCH_ALBUMS_SUCCESS', 'FETCH_ALBUMS_ERROR'
]);

export default Actions;
