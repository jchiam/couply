import * as firebase from 'firebase';
import axios from 'axios';
import cache from 'memory-cache';

import Actions from 'constants/actions';

function isValidUser(id) {
  const validIDs = process.env.AUTHORISED_FB_ID.trim().split(',');
  return validIDs.indexOf(id) !== -1;
}

export function fetchAlbumsWithoutAuth() {
  return (dispatch) => {
    dispatch({ type: Actions.FETCHING_ALBUMS });

    if (cache.get('albums')) {
      dispatch({ type: Actions.FETCH_ALBUMS_SUCCESS, albums: cache.get('albums') });
    } else {
      axios.get('/cloudinary')
      .then(response => response.data)
      .then((data) => {
        cache.put('albums', data);
        dispatch({ type: Actions.FETCH_ALBUMS_SUCCESS, albums: data });
      });
    }
  };
}

export function fetchAlbums(authenticated) {
  if (authenticated) {
    return dispatch => dispatch(fetchAlbumsWithoutAuth());
  } else {
    return (dispatch) => {
      dispatch({ type: Actions.FACEBOOK_LOGGING_IN });

      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          if (result.credential) {
            const isValid = isValidUser(result.additionalUserInfo.profile.id);
            if (isValid) {
              const token = result.credential.accessToken;
              const user = {
                id: result.additionalUserInfo.profile.id,
                name: result.user.displayName,
                photo: result.user.photoURL
              };
              dispatch({ type: Actions.FACEBOOK_LOGGED_IN, token, user });
            } else {
              dispatch({ type: Actions.FACEBOOK_LOGIN_ERROR });
            }
          }
        })
        .then(() => dispatch(fetchAlbumsWithoutAuth()));
    };
  }
}
