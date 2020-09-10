import React, { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { Logo } from '../Logo';
import { Movie } from '../MovieCard';
import { ModalWithForm } from '../ModalWithForm';
import { CongratulationsModal } from '../CongratulationsModal';
import { ModalWindowWrapper } from '../ModalWindowWrapper';
import { useToggle } from '../../Utilities';
import css from './Header.less';

export function Header({ addMovie, searchMovie }:
  { addMovie: (newMovie: Movie) => void, searchMovie: (searchString: string) => void },
) {
  const [showAddModal, setShowAddModal] = useToggle(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useToggle(false);
  const [searchString, setSearchString] = useState<string>('');

  const submitAddForm = (formData: Partial<Movie>) => {
    const newMovie = {
      ...formData,
      id: new Date().getTime(),
      tagline: '',
      vote_average: +(Math.random() * 10).toFixed(1),
      vote_count: Math.round(Math.random() * 1000),
      budget: Math.round(+Math.random().toFixed(2) * Math.pow(10, 9)),
      revenue: Math.round(Math.random() * Math.pow(10, 9)),
    } as Movie;
    addMovie(newMovie);
    setShowAddModal();
    setShowCongratulationsModal();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const onSearch = () => {
    searchMovie(searchString);
  };

  return (
    <header>
      <Logo />
      <button className={css.addButton} onClick={setShowAddModal}>+ ADD MOVIE</button>
      <div className={css.searchContainer}>
        <label>FIND YOUR MOVIE</label>
        <div className={css.search}>
          <input
            type="text"
            placeholder="What do you want to watch?"
            onChange={handleInputChange}
          />
          <button onClick={onSearch}>SEARCH</button>
        </div>
      </div>
      {
        showAddModal ? (
          <ModalWindowWrapper onClose={setShowAddModal}>
            <ModalWithForm onReset={setShowAddModal} onSubmit={submitAddForm}/>
          </ModalWindowWrapper>
        ) : null
      }
      {
        showCongratulationsModal ? (
          <ModalWindowWrapper onClose={setShowCongratulationsModal}>
            <CongratulationsModal />
          </ModalWindowWrapper>
        ) : null
      }
    </header>
  );
}

Header.propTypes = {
  addMovie: PropTypes.func.isRequired,
  searchMovie: PropTypes.func.isRequired,
};
