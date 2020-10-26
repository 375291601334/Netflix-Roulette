import React from 'react';
import { render } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  test('render NotFoundPage', () => {
    const { baseElement } = render(<NotFoundPage />);
    expect(baseElement).toMatchSnapshot();
  });
});
