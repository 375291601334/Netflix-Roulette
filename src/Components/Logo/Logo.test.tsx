import React from 'react';
import { render } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  test('render Logo', () => {
    const { baseElement } = render(<Logo />);
    expect(baseElement).toMatchSnapshot();
  });
});
