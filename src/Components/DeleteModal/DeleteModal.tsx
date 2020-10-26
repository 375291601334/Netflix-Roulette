import React from 'react';
import PropTypes from 'prop-types';
import css from './DeleteModal.less';

export function DeleteModal({ onConfirm }: { onConfirm: () => void }) {
  return (
    <>
      <h2>DELETE MOVIE</h2>
      <p>Are you sure you want to delete this movie?</p>
      <button className={css.confirmButton} data-ui="primary" onClick={onConfirm}>
        CONFIRM
      </button>
    </>
  );
}

DeleteModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};
