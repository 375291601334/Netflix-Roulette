import React from 'react';
import PropTypes from 'prop-types';
import css from './Navigation.less';

export function Navigation(props) {
  const genres = ['Documentary', 'Comedy', 'Horror', 'Crime'];
  const sortOptions = ['Release date', 'Rating', 'Views'];

  return(
    <>
      <nav>
        <ul>
          <li className={css.active} key="All">All</li>
          {genres.map(genre => <li key={genre}>{genre}</li>)}
        </ul>
        <div className={css.sorting}>
          <label>SORT BY</label>
          <select>
            {sortOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>
      </nav>
      <div className={css.postNavigation}>
        <div className={css.counting}>{props.moviesNumber} movies found</div>
        <div className={css.mobileSorting}>
          <label>SORT BY</label>
          <select>
            {sortOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>
      </div>
    </>
  );
}

Navigation.propTypes = {
  moviesNumber: PropTypes.number,
};

Navigation.defaultProps = {
  moviesNumber: 0,
};
