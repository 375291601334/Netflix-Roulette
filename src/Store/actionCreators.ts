import { actionTypes } from './actionTypes';
import { Movie } from '../Components';

export function fetchMovies() {
  return dispatch => dispatch({
    type: actionTypes.FETCH_MOVIES,
  });
}

export function addMovie(movie: Movie) {
  return dispatch => dispatch({
    type: actionTypes.ADD_MOVIE,
    payload: movie,
  });
}

export function updateMovie(movie: Movie) {
  return dispatch => dispatch({
    type: actionTypes.UPDATE_MOVIE,
    payload: movie,
  });
}

export function deleteMovie(movieID: Movie['id']) {
  return dispatch => dispatch({
    type: actionTypes.DELETE_MOVIE,
    payload: movieID,
  });
}
