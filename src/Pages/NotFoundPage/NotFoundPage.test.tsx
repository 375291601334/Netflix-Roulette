import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  test('render NotFoundPage', () => {
    const { baseElement } = render(<BrowserRouter><NotFoundPage /></BrowserRouter>);
    expect(baseElement).toMatchSnapshot();
  });
});
