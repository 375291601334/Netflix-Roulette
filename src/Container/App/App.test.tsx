import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

jest.mock('../../Pages', () => () => (<div>Main Page</div>));

describe('App', () => {
  test('render App', () => {
    const { baseElement } = render(<BrowserRouter><App /></BrowserRouter>);
    expect(baseElement).toMatchSnapshot();
  });
});
