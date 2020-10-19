import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalWindowWrapper } from './ModalWindowWrapper';

const onClose = jest.fn();

jest.mock('./ModalWindow', () => ({
  ModalWindow: ({ children }) => {
    return (
      <div className="modal">
        {children}
      </div>
    );
  },
}));

describe('ModalWindowWrapper', () => {
  test('render inner content and call onClose method when ckicking on close button', () => {
    const { getByText, container } = render(
      <ModalWindowWrapper onClose={onClose}>
        <span>Content</span>
      </ModalWindowWrapper>,
    );

    expect(getByText('Content')).toBeTruthy();
    userEvent.click(container.getElementsByClassName('closeButton')[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
