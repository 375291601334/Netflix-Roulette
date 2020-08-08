import React from 'react';
import { Logo } from '../Logo';
import css from './Header.less';

export function Header() {
  return (
    <header>
      <Logo />
      <button className={css.addButton}>+ ADD MOVIE</button>
      <div className={css.searchContainer}>
        <label>FIND YOUR MOVIE</label>
        <div className={css.search}>
          <input type="text" placeholder="What do you want to watch?" />
          <button>SEARCH</button>
        </div>
      </div>
    </header>
  );
}
