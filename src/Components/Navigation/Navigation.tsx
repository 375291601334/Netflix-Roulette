import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import css from './Navigation.less';

export function Navigation(
  { moviesNumber, changeGenre, changeSortingOption, activeGenreClass }: {
    moviesNumber: number;
    changeGenre: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    changeSortingOption: (event: ChangeEvent<HTMLSelectElement>) => void;
    activeGenreClass: string;
  },
) {
  const genres = ['Documentary', 'Comedy', 'Horror', 'Crime'];
  const sortOptions = [
    { label: 'Release date', value: 'release_date' },
    { label: 'Revenue', value: 'revenue' },
    { label: 'Votes', value: 'vote_average' },
  ];

  return(
    <>
      <nav>
        <ul onClick={changeGenre}>
          <li className={activeGenreClass} key="All" data-value="All">All</li>
          {genres.map(genre => <li key={genre} data-value={genre}>{genre}</li>)}
        </ul>
        <div className={css.sorting}>
          <label>SORT BY</label>
          <select onChange={changeSortingOption}>
            {sortOptions.map(option =>
              <option key={option.value} value={option.value}>{option.label}</option>,
            )}
          </select>
        </div>
      </nav>
      <div className={css.postNavigation}>
        <div className={css.counting}>{moviesNumber} movies found</div>
        <div className={css.mobileSorting}>
          <label>SORT BY</label>
          <select onChange={changeSortingOption}>
          {sortOptions.map(option =>
            <option key={option.value} value={option.value}>{option.label}</option>,
          )}
          </select>
        </div>
      </div>
    </>
  );
}

Navigation.propTypes = {
  moviesNumber: PropTypes.number.isRequired,
  changeGenre: PropTypes.func.isRequired,
  changeSortingOption: PropTypes.func.isRequired,
  activeGenreClass: PropTypes.string.isRequired,
};
