import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

jest.mock('../MainPage', () => () => (<div>Main Page</div>));

describe('App', () => {
  test('render App', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toMatchSnapshot();
  });
});
