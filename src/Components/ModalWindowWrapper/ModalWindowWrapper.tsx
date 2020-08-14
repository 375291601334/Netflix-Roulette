import React from 'react';
import PropTypes from 'prop-types';
import { ModalWindow } from './ModalWindow';
import css from './ModalWindowWrapper.less';

export function ModalWindowWrapper(
  { children, onClose }: { children: JSX.Element, onClose: () => void },
) {
  return (
    <ModalWindow>
      <>
        <div className={css.closeButton} onClick={onClose}>
          <span>+</span>
        </div>
        {children}
      </>
    </ModalWindow>
  );
}

ModalWindowWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};
