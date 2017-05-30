import mirrorCreator from 'mirror-creator';

const Actions = mirrorCreator([
  'FETCHING_ALBUMS', 'FETCH_ALBUMS_SUCCESS', 'FETCH_ALBUMS_ERROR',
  'FACEBOOK_LOGGING_IN', 'FACEBOOK_LOGGED_IN', 'FACEBOOK_LOGIN_ERROR'
]);

export default Actions;
