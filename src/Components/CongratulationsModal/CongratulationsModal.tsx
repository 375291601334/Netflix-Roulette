import React from 'react';
import css from './CongratulationsModal.less';

export function CongratulationsModal() {
  return (
    <>
      <span className={css.checkmarkIcon}>✔</span>
      <h2>CONGRATULATIONS!</h2>
      <p>The movie has been added to <br /> database successfully.</p>
    </>
  );
}
