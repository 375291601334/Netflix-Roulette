import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, Logo } from '../../Components';
import css from './NotFoundPage.less';

export function NotFoundPage() {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <h2 className={css.title}>Page Not Found</h2>
        <span className={css.icon} />
        <Link to={'/films'} >
          <button className={css.homeButton}>GO BACK TO HOME</button>
        </Link>
      </div>
    </div>
  );
}
