import React from 'react';
import { Logo } from '../Logo';
import { Movie } from '../MovieCard';
import css from './MovieDetails.less';

export function MovieDetails(
  { movie, unselectMovie }: { movie: Movie, unselectMovie: () => void },
) {
  const posterStyle = {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${movie.poster_path})`,
  };

  return (
    <div className={css.wrapper}>
      <div className={css.searchBar}>
        <Logo />
        <span className={css.searchIcon} onClick={unselectMovie} />
      </div>
      <div className={css.movieInfo}>
        <div className={css.poster} style={posterStyle} />
        <div className={css.mainInfoContainer}>
          <h2>{movie.title}</h2>
          <span className={css.votes}>{movie.vote_average}</span>
          <p>{movie.tagline}</p>
          <div className={css.numberCharacteristics}>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>{movie.runtime} min</span>
          </div>
          <div>{movie.overview}</div>
        </div>
      </div>
    </div>
  );
}
