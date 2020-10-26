import React from 'react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import configureStore from 'redux-mock-store';
import MainPage, { mapStateToProps } from './MainPage';

const mockStore = configureStore([]);

const movies = [
  {
    id: 123,
    title: 'Movie 1 title',
    tagline: '',
    vote_average: 2.3,
    vote_count: 3.5,
    release_date: '2020-10-13',
    poster_path: 'https://someImage.com',
    overview: 'Movie overview',
    budget: 4365600,
    revenue: 5466453,
    genres: ['Comedy'],
    runtime: 123,
  },
  {
    id: 456,
    title: 'Movie 2 title',
    tagline: '',
    vote_average: 9.3,
    vote_count: 7.5,
    release_date: '2021-10-13',
    poster_path: 'https://someImage.com',
    overview: 'Movie overview',
    budget: 655600,
    revenue: 6453,
    genres: ['Crime'],
    runtime: 846,
  },
];

jest.mock('next/router', () => {
  return {
    useRouter: () => {
      return {
        query: {},
      };
    },
  };
});

describe('MainPage', () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  test('render MainPage', () => {
    const store = mockStore({
      movies: {
        data: movies,
        loading: false,
        error: null,
      },
      filtering: 'All',
      sorting: 'release_date',
    });

    const { baseElement } = render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('render MainPage without movies', () => {
    const store = mockStore({
      movies: {
        data: [],
        loading: false,
        error: null,
      },
      filtering: 'All',
      sorting: 'release_date',
    });

    const { getByText } = render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    expect(getByText('No movies found')).toBeTruthy();
  });

  test('render MainPage when error occured', () => {
    const store = mockStore({
      movies: {
        data: [],
        loading: false,
        error: new Error('some error'),
      },
      filtering: 'All',
      sorting: 'release_date',
    });

    const { getByText } = render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    expect(getByText('Error has occured! Try again in few minutes...')).toBeTruthy();
  });

  test('change genre to Comedy', async () => {
    const store = mockStore({
      movies: {
        data: movies,
        loading: false,
        error: null,
      },
      filtering: 'All',
      sorting: 'release_date',
    });

    const { container } = render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    userEvent.click(container.querySelector('[data-value=Comedy]'));
    expect(store.getActions().pop()).toEqual({ payload: 'Comedy', type: 'SET_FILTERING_OPTION' });
  });

  test('change sorting to revenue', async () => {
    const store = mockStore({
      movies: {
        data: movies,
        loading: false,
        error: null,
      },
      filtering: 'All',
      sorting: 'release_date',
    });

    const { getByRole } = render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    userEvent.selectOptions(getByRole('navigation').getElementsByTagName('select')[0], 'revenue');
    expect(store.getActions().pop()).toEqual({ payload: 'revenue', type: 'SET_SORTING_OPTION' });
  });

  test('change sorting to revenue', async () => {
    const store = mockStore({
      movies: {
        data: movies,
        loading: false,
        error: null,
      },
      filtering: 'All',
      sorting: 'release_date',
    });

    const { getByRole } = render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    userEvent.selectOptions(getByRole('navigation').getElementsByTagName('select')[0], 'revenue');
    expect(store.getActions().pop()).toEqual({ payload: 'revenue', type: 'SET_SORTING_OPTION' });
  });

  describe('mapStateToProps', () => {
    test('filter movies by genre', () => {
      const state = {
        movies: {
          data: movies,
          loading: false,
          error: null,
        },
        filtering: 'Comedy',
        sorting: 'release_date',
      };
      expect(mapStateToProps(state)).toEqual({
        loading: state.movies.loading,
        error: state.movies.error,
        movies: movies.filter(movie => movie.genres.includes(state.filtering)),
      });
    });

    test('sort movies by votes if second movie should go first', () => {
      const newMovies = [{ ...movies[0], vote_average: 7 }, { ...movies[1], vote_average: 9 }];
      const state = {
        movies: {
          data: newMovies,
          loading: false,
          error: null,
        },
        filtering: 'All',
        sorting: 'vote_average',
      };
      expect(mapStateToProps(state)).toEqual({
        loading: state.movies.loading,
        error: state.movies.error,
        movies: newMovies.reverse(),
      });
    });

    test('sort movies by votes if first and second movie have equal voices', () => {
      const newMovies = movies.map(movie => movie.vote_average = 9);
      const state = {
        movies: {
          data: newMovies,
          loading: false,
          error: null,
        },
        filtering: 'All',
        sorting: 'vote_average',
      };
      expect(mapStateToProps(state)).toEqual({
        loading: state.movies.loading,
        error: state.movies.error,
        movies: newMovies,
      });
    });

    test('sort movies by votes if first movie should go first', () => {
      const newMovies = [{ ...movies[0], vote_average: 7 }, { ...movies[1], vote_average: 4 }];
      const state = {
        movies: {
          data: newMovies,
          loading: false,
          error: null,
        },
        filtering: 'All',
        sorting: 'vote_average',
      };
      expect(mapStateToProps(state)).toEqual({
        loading: state.movies.loading,
        error: state.movies.error,
        movies: newMovies,
      });
    });
  });
});
