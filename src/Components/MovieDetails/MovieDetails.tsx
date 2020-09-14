import React, { useState, useEffect } from 'react';
import { Logo } from '../Logo';
import { Movie } from '../MovieCard';
import css from './MovieDetails.less';

export function MovieDetails(
  { selectedMovie, unselectMovie }: { selectedMovie?: Movie, unselectMovie: () => void },
) {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const posterStyle = {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${movie.poster_path})`,
  };

  useEffect(
    () => {
      selectedMovie && setMovie(selectedMovie);
    },
    [selectedMovie],
  );

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
            { movie.release_date && <span>{new Date(movie.release_date).getFullYear()}</span>}
            <span>{movie.runtime} min</span>
          </div>
          <div>{movie.overview}</div>
        </div>
      </div>
    </div>
  );
}
