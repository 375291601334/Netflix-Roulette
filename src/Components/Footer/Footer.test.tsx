import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  test('render Footer', () => {
    const { baseElement } = render(<Footer><span>Logo</span></Footer>);
    expect(baseElement).toMatchSnapshot();
  });
});
