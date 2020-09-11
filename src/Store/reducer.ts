import { actionTypes } from './actionTypes';

const movies = require('../movies.json');

export const rootReducer = (state = movies, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_MOVIES:
      return [...state];

    case actionTypes.ADD_MOVIE:
      return [...state, payload];

    case actionTypes.UPDATE_MOVIE:
      return state.map(movie => movie.id === payload.id ? payload : movie);

    case actionTypes.DELETE_MOVIE:
      console.log(payload);
      return state.filter(movie => movie.id !== payload);

    default:
      return state;
  }
};
