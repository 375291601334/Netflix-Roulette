import { actions, actionTypes, rootReducer } from './index';

describe('Store', () => {
  describe('Reducers:', () => {
    it('should return the initial state', () => {
      expect(rootReducer(undefined, { type: undefined })).toEqual(
        {
          movies: {
            data: [],
            loading: false,
            error: null,
          },
          filtering: 'All',
          sorting: 'release_date',
        },
      );
    });
  });

  describe('movies reducer:', () => {
    it('should handle fetch movies action', () => {
      expect(rootReducer(undefined, actions.fetchMovies())).toEqual(
        {
          movies: {
            data: [],
            loading: true,
            error: null,
          },
          filtering: 'All',
          sorting: 'release_date',
        },
      );
    });

    it('should handle fetch movies success action', () => {
      const movies = [
        { id: 1, title: 'First Movie' },
        { id: 2, title: 'Second Movie' },
      ];

      expect(rootReducer(undefined, actions.fetchMoviesSuccess(movies))).toEqual(
        {
          movies: {
            data: movies,
            loading: false,
            error: null,
          },
          filtering: 'All',
          sorting: 'release_date',
        },
      );
    });

    it('should handle fetch movies failure action', () => {
      const error = new Error('Some Error');

      expect(rootReducer(undefined, actions.fetchMoviesFailure(error))).toEqual(
        {
          movies: {
            error,
            data: [],
            loading: false,
          },
          filtering: 'All',
          sorting: 'release_date',
        },
      );
    });

    it('should handle add movie action', () => {
      const movie = {
        title: 'Movie title',
      };

      expect(rootReducer(undefined, actions.addMovie(movie))).toEqual(
        {
          movies: {
            data: [movie],
            loading: false,
            error: null,
          },
          filtering: 'All',
          sorting: 'release_date',
        },
      );
    });

    it('should handle udate movie action', () => {
      const movies = [
        { id: 1, title: 'First Movie' },
        { id: 2, title: 'Second Movie' },
      ];
      const state = {
        movies: {
          data: movies,
          loading: false,
          error: null,
        },
        filtering: 'All',
        sorting: 'release_date',
      };
      const updatedMovie = { ...movies[0], title: 'New Title' };

      expect(rootReducer(state, actions.updateMovie(updatedMovie))).toEqual(
        {
          movies: {
            data: [{ ...movies[0], title: 'New Title' } , movies[1]],
            loading: false,
            error: null,
          },
          filtering: 'All',
          sorting: 'release_date',
        },
      );
    });

    it('should handle delete movie action', () => {
      const state = {
        movies: {
          data: [{
            id: 123,
            title: 'Movie title',
          }],
          loading: false,
          error: null,
        },
        filtering: 'All',
        sorting: 'release_date',
      };

      expect(rootReducer(state, actions.deleteMovie(123))).toEqual(
        {
          movies: {
            data: [],
            loading: false,
            error: null,
          },
          filtering: 'All',
          sorting: 'release_date',
        },
      );
    });
  });

  describe('filtering reducer:', () => {
    it('should handle set filtering option action', () => {
      expect(rootReducer(undefined, actions.setFilteringOption('New Option'))).toEqual(
        {
          movies: {
            data: [],
            loading: false,
            error: null,
          },
          filtering: 'New Option',
          sorting: 'release_date',
        },
      );
    });
  });

  describe('sorting reducer:', () => {
    it('should handle set sorting option action', () => {
      expect(rootReducer(undefined, actions.setSortingOption('some_option'))).toEqual(
        {
          movies: {
            data: [],
            loading: false,
            error: null,
          },
          filtering: 'All',
          sorting: 'some_option',
        },
      );
    });
  });
});
