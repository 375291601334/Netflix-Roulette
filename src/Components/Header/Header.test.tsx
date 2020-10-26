import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

const addMovie = jest.fn();

jest.mock('next/router', () => {
  return {
    useRouter: () => {
      return {
        query: { searchString: 'test' },
      };
    },
  };
});

jest.mock('../ModalWindowWrapper', () => ({
  ModalWindowWrapper: ({ children, onClose }: { children: JSX.Element, onClose: () => void }) => {
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
  ModalWithForm: (
    { onReset, onSubmit }: { onReset: () => void, onSubmit: () => void },
  ) => {
    return (
      <div>
        <h2>Add Movie Form</h2>
        <button onClick={onSubmit}>SUBMIT</button>
        <button onClick={onReset}>RESET</button>
      </div>
    );
  },
}));

describe('Header', () => {
  test('after clicking ADD MOVIE modal window will appear', () => {
    const { container, getByText } = render(<Header addMovie={addMovie} />);

    userEvent.click(getByText('+ ADD MOVIE'));
    expect(getByText('Modal Window')).toBeTruthy();

    userEvent.click(getByText('Close'));
    expect(container.getElementsByClassName('modal')).toHaveLength(0);
  });

  test('after submiting Add Movie Form Congratulations modal window will appear', () => {
    const { container, getByText } = render(<Header addMovie={addMovie} />);

    userEvent.click(getByText('+ ADD MOVIE'));
    expect(getByText('Modal Window')).toBeTruthy();
    expect(getByText('Add Movie Form')).toBeTruthy();

    userEvent.click(getByText('SUBMIT'));
    expect(getByText('CONGRATULATIONS!')).toBeTruthy();

    userEvent.click(getByText('Close'));
    expect(container.getElementsByClassName('modal')).toHaveLength(0);
  });

  test('modal window will disappear after reseting Add Movie Form', () => {
    const { container, getByText } = render(<Header addMovie={addMovie} />);

    userEvent.click(getByText('+ ADD MOVIE'));
    expect(getByText('Modal Window')).toBeTruthy();
    expect(getByText('Add Movie Form')).toBeTruthy();

    userEvent.click(getByText('RESET'));
    expect(container.getElementsByClassName('modal')).toHaveLength(0);
  });

  test('search button change href when user type another string into search input', () => {
    const { getByDisplayValue, getByText } = render(<Header addMovie={addMovie} />);

    const searchInput = getByDisplayValue('test');
    expect(searchInput).toBeTruthy();
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'movie title');
    expect(getByText('SEARCH').getAttribute('href')).toBe('/search?searchString=movie%20title');
  });
});
