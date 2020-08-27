import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import css from './Navigation.less';

export function Navigation(
  { moviesNumber, changeGenre, changeSortingOption }: {
    moviesNumber: number;
    changeGenre: (genre: string) => void,
    changeSortingOption: (option: string) => void },
) {
  const genres = ['Documentary', 'Comedy', 'Horror', 'Crime'];
  const sortOptions = [
    { label: 'Release date', value: 'release_date' },
    { label: 'Revenue', value: 'revenue' },
    { label: 'Votes', value: 'vote_average' },
  ];

  const onGenreSelect = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const container = event.currentTarget;
    const element = event.target as HTMLElement;
    if (element === container) return;

    Array.from(container.getElementsByClassName(css.active)).map(
      element => element.classList.remove(css.active),
    );
    element.classList.add(css.active);

    changeGenre(element.dataset.value);
  };

  const onSortingSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    changeSortingOption(event.currentTarget.value);
  };

  return(
    <>
      <nav>
        <ul onClick={onGenreSelect}>
          <li className={css.active} key="All" data-value="All">All</li>
          {genres.map(genre => <li key={genre} data-value={genre}>{genre}</li>)}
        </ul>
        <div className={css.sorting}>
          <label>SORT BY</label>
          <select onChange={onSortingSelect} >
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
          <select onChange={onSortingSelect}>
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
};
