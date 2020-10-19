import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  test('render error message', () => {
    function CorrectChild() {
      return <div>Correct code</div>;
    }
    const { getByText } = render(<ErrorBoundary><CorrectChild /></ErrorBoundary>);
    expect(getByText('Correct code')).toBeTruthy();
  });

  test('render error message', () => {
    function ProblemChild() {
      throw new Error('Error thrown from problem child');
      return <div>Error</div>;
    }
    const { getByText } = render(<ErrorBoundary><ProblemChild /></ErrorBoundary>);
    expect(getByText('Something went wrong... Please, try again in 1 minute')).toBeTruthy();
  });
});
