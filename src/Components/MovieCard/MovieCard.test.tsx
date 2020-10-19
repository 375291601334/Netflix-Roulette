import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { MovieCard } from './MovieCard';

const deleteMovie = jest.fn();
const editMovie = jest.fn();

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

jest.mock('../ModalWindowWrapper', () => ({
  ModalWindowWrapper: ({ children, onClose }) => {
    return (
      <div className="modal">
        <h2>Modal Window</h2>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    );
  },
}));

jest.mock('../ModalWithForm', () => ({
  ModalWithForm: ({ onReset, onSubmit }) => {
    return (
      <div>
        <h2>Edit Movie Form</h2>
        <button onClick={onSubmit}>SUBMIT</button>
        <button onClick={onReset}>RESET</button>
      </div>
    );
  },
}));

describe('MovieCard', () => {
  test('render MovieCard', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <MovieCard editMovie={editMovie} deleteMovie={deleteMovie} movie={movie} />
      </BrowserRouter>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  test('open and close movie menu', () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <MovieCard editMovie={editMovie} deleteMovie={deleteMovie} movie={movie} />
      </BrowserRouter>,
    );

    userEvent.click(getByText('⋮'));
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();

    userEvent.click(getByText('+'));
    expect(
      container.getElementsByClassName('menu')[0].getAttribute('style'),
    ).toBe('display: none;');
  });

  test('open and submit Edit Movie Form modal window', () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <MovieCard editMovie={editMovie} deleteMovie={deleteMovie} movie={movie} />
      </BrowserRouter>,
    );

    userEvent.click(getByText('⋮'));
    userEvent.click(getByText('Edit'));
    expect(getByText('Edit Movie Form')).toBeTruthy();

    userEvent.click(getByText('SUBMIT'));
    expect(container.getElementsByClassName('modal')).toHaveLength(0);
  });

  test('open and submit Delete Movie modal window', () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <MovieCard editMovie={editMovie} deleteMovie={deleteMovie} movie={movie} />
      </BrowserRouter>,
    );

    userEvent.click(getByText('⋮'));
    userEvent.click(getByText('Delete'));
    expect(getByText('DELETE MOVIE')).toBeTruthy();

    userEvent.click(getByText('CONFIRM'));
    expect(container.getElementsByClassName('modal')).toHaveLength(0);
  });
});
