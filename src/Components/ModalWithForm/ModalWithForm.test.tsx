import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { ModalWithForm } from './ModalWithForm';

const onSubmit = jest.fn();
const onReset = jest.fn();
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

describe('ModalWithForm', () => {
  test('render Edit movie form', () => {
    render(
      <ModalWithForm onReset={onReset} onSubmit={onSubmit} movie={movie} />,
    );
    expect(screen.getByRole('heading').textContent).toBe('EDIT MOVIE');
  });

  test('render Add movie form', () => {
    render(
      <ModalWithForm onReset={onReset} onSubmit={onSubmit} />,
    );
    expect(screen.getByRole('heading').textContent).toBe('ADD MOVIE');
  });

  test('submiting Add movie form', async () => {
    render(
      <ModalWithForm onReset={onReset} onSubmit={onSubmit} />,
    );
    userEvent.type(screen.getByPlaceholderText('Movie title'), 'Title');

    fireEvent.click(screen.getByPlaceholderText('Select release date'));
    fireEvent.change(screen.getByPlaceholderText('Select release date'), { target: { value: '2019-10-23' } });

    userEvent.type(screen.getByPlaceholderText('Movie url'), 'https://site.com');

    selectEvent.openMenu(screen.getByLabelText('GENRE'));
    fireEvent.click(screen.getByText('Comedy'));

    userEvent.type(screen.getByPlaceholderText('Movie overview'), 'Overview...');

    fireEvent.click(screen.getByPlaceholderText('Movie runtime'));
    fireEvent.change(screen.getByPlaceholderText('Movie runtime'), { target: { value: 123 } });

    fireEvent.click(screen.getByText('SUBMIT'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test('reseting Edit movie form', () => {
    render(
      <ModalWithForm onReset={onReset} onSubmit={onSubmit} movie={movie} />,
    );
    fireEvent.click(screen.getByText('RESET'));

    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
