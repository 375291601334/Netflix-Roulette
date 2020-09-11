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

const initialState = {
  movies: [],
  loading: false,
  error: null,
  sortingOption: 'release_date',
  filteringOption: 'All',
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_MOVIES:
      return { ...state, loading: true };

    case actionTypes.FETCH_MOVIES_SUCCESS:
      return { ...state, loading: false, error: payload };

    case actionTypes.FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: payload };

    case actionTypes.ADD_MOVIE:
      return { ...state, movies: [...state.movies, payload] };

    case actionTypes.UPDATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map(movie => movie.id === payload.id ? payload : movie),
      };

    case actionTypes.DELETE_MOVIE:
      return { ...state, movies: state.movies.filter(movie => movie.id !== payload) };

    case actionTypes.SET_FILTERING_OPTION:
      return { ...state, filteringOption: payload };

    case actionTypes.SET_SORTING_OPTION:
      return { ...state, sortingOption: payload };

    default:
      return state;
  }
};
