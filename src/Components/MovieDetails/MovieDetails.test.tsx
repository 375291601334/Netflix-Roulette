import React from 'react';
import { render } from '@testing-library/react';
import { MovieDetails } from './MovieDetails';

const movie = {
  id: 123,
  title: 'Movie title',
  tagline: '',
  vote_average: 7.3,
  vote_count: 8.5,
  release_date: '2020-10-13',
  poster_path: 'https://someImage.com',
  overview: 'Movie overview',
  budget: 4365600,
  revenue: 5466453,
  genres: ['Comedy'],
  runtime: 123,
};

jest.mock('next/router', () => {
  return {
    useRouter: () => {
      return {
        query: { id: 123 },
      };
    },
  };
});

const getMovie = jest.fn().mockReturnValue(movie);

describe('MovieDetails', () => {
  test('render MovieDetails', () => {
    const { baseElement } = render(
      <MovieDetails getMovie={getMovie} />,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
