import React from 'react';
import PropTypes from 'prop-types';
import css from './MovieCard.less';

export function MovieCard(props) {
  return (
    <div className={css.card}>
      <img src={props.movie.poster_path} alt={`${props.movie.title} poster`} />
      <div className={css.mainInfoContainer}>
        <h4>{props.movie.title}</h4>
        <span className={css.date}>{new Date(props.movie.release_date).getFullYear()}</span>
      </div>
      <p>{props.movie.genres.join(', ')}</p>
    </div>
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
};
