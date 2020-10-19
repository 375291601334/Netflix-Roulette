import { combineReducers } from 'redux';

export const actionTypes = {
  FETCH_MOVIES: 'FETCH_MOVIES',
  FETCH_MOVIES_SUCCESS: 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_FAILURE: 'FETCH_MOVIES_FAILURE',

  ADD_MOVIE: 'ADD_MOVIE',
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  DELETE_MOVIE: 'DELETE_MOVIE',

  SET_SORTING_OPTION: 'SET_SORTING_OPTION',
  SET_FILTERING_OPTION: 'SET_FILTERING_OPTION',
};

export const actions = {
  fetchMovies: () => ({ type: actionTypes.FETCH_MOVIES }),

  fetchMoviesSuccess: movies => ({
    type: actionTypes.FETCH_MOVIES_SUCCESS,
    payload: movies,
  }),

  fetchMoviesFailure: error => ({
    type: actionTypes.FETCH_MOVIES_FAILURE,
    payload: error,
  }),

  deleteMovie: id => ({ type: actionTypes.DELETE_MOVIE, payload: id }),

  addMovie: movie => ({ type: actionTypes.ADD_MOVIE, payload: movie }),

  updateMovie: movie => ({ type: actionTypes.UPDATE_MOVIE, payload: movie }),

  setFilteringOption: option => ({
    type: actionTypes.SET_FILTERING_OPTION,
    payload: option,
  }),

  setSortingOption: option => ({
    type: actionTypes.SET_SORTING_OPTION,
    payload: option,
  }),
};

const moviesInitialState = {
  data: [],
  loading: false,
  error: null,
};

const movies = (state = moviesInitialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_MOVIES:
      return { ...state, loading: true };

    case actionTypes.FETCH_MOVIES_SUCCESS:
      return { ...state, loading: false, data: payload };

    case actionTypes.FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: payload };

    case actionTypes.ADD_MOVIE:
      return { ...state, data: [...state.data, payload] };

    case actionTypes.UPDATE_MOVIE:
      return {
        ...state,
        data: state.data.map(movie => movie.id === payload.id ? payload : movie),
      };

    case actionTypes.DELETE_MOVIE:
      return { ...state, data: state.data.filter(movie => movie.id !== payload) };

    default:
      return state;
  }
};

const filtering = (state = 'All', { type, payload }) => {
  if (type === actionTypes.SET_FILTERING_OPTION) {
    return payload;
  }
  return state;
};

const sorting = (state = 'release_date', { type, payload }) => {
  if (type === actionTypes.SET_SORTING_OPTION) {
    return payload;
  }
  return state;
};

export const rootReducer = combineReducers({
  movies,
  filtering,
  sorting,
});
