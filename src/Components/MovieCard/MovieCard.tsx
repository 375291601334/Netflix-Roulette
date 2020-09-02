import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalWithForm } from '../ModalWithForm';
import { DeleteModal } from '../DeleteModal';
import { ModalWindowWrapper } from '../ModalWindowWrapper';
import { Movie } from './Movie.model';
import { useToggle } from '../../Utilities';
import css from './MovieCard.less';

export function MovieCard({ movie, deleteMovie, editMovie, selectMovie }:
  {
    movie: Movie,
    deleteMovie: (id: Movie['id']) => void,
    editMovie: (movie: Movie) => void,
    selectMovie: (id: Movie['id']) => void,
  },
) {
  const [showEditModal, setShowEditModal] = useToggle(false);
  const [showDeleteModal, setShowDeleteModal] = useToggle(false);

  const openMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    ((event.target as HTMLElement).nextElementSibling as HTMLElement).style.setProperty('display', 'block');
  };

  const closeMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    ((event.currentTarget as HTMLElement).parentElement as HTMLElement).style.setProperty('display', 'none');
  };

  const openEditModal = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setShowEditModal();
    closeMenu(event);
  };

  const openDeleteModal = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setShowDeleteModal();
    closeMenu(event);
  };

  const onEditSubmit = (formData: Partial<Movie>) => {
    editMovie({ ...movie, ...formData });
    setShowEditModal();
  };

  const onDeleteConfirm = () => {
    deleteMovie(movie.id);
    setShowDeleteModal();
  };

  const onMovieCardClick = () => {
    selectMovie(movie.id);
  };

  return (
    <>
      <div className={css.card} onClick={onMovieCardClick}>
        <span className={css.menuIcon} onClick={openMenu}>⋮</span>
        <div className={css.menu}>
          <button className={css.closeButton} onClick={closeMenu}>
            <span className={css.closeIcon}>+</span>
          </button>
          <div className={css.option} onClick={openEditModal}>Edit</div>
          <div className={css.option} onClick={openDeleteModal}>Delete</div>
        </div>

        <img src={movie.poster_path} alt={`${movie.title} poster`} />
        <div className={css.mainInfoContainer}>
          <h4>{movie.title}</h4>
          <span className={css.date}>
            {new Date(movie.release_date).getFullYear()}
          </span>
        </div>
        <p>{movie.genres.join(', ')}</p>
      </div>
      {
        showDeleteModal ? (
          <ModalWindowWrapper onClose={setShowDeleteModal}>
            <DeleteModal onConfirm={onDeleteConfirm} />
          </ModalWindowWrapper>
        ) : null
      }
      {
        showEditModal ? (
          <ModalWindowWrapper onClose={setShowEditModal}>
            <ModalWithForm
              movie={movie}
              onReset={setShowEditModal}
              onSubmit={onEditSubmit}
            />
          </ModalWindowWrapper>
        ) : null
      }
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    runtime: PropTypes.number.isRequired,
  }).isRequired,
  deleteMovie: PropTypes.func.isRequired,
  editMovie: PropTypes.func.isRequired,
};
