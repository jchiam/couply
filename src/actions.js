import axios from 'axios';
import cache from 'memory-cache';
import Actions from 'constants/actions';

export function fetchAlbums() {
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
