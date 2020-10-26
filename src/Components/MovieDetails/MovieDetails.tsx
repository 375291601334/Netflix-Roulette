import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Movie } from '../MovieCard';
import css from './MovieDetails.less';

export function MovieDetails({ getMovie }: { getMovie: (id: string) => Movie}) {
  const [movie, setMovie] = useState<Movie>((undefined as unknown) as Movie);
  const router = useRouter();
  const { id } = router.query;

  useEffect(
    () => {
      const selectedMovie = getMovie(id as string);
      setMovie(selectedMovie);
    },
    [id],
  );

  const posterStyle = {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${movie?.poster_path})`,
  };

  return (
    <div className={css.wrapper}>
      <Link href={'/films'}><span className={css.searchIcon} /></Link>
      <div className={css.movieInfo}>
        <div className={css.poster} style={posterStyle} />
        <div className={css.mainInfoContainer}>
          <h2>{movie?.title}</h2>
          <span className={css.votes}>{movie?.vote_average}</span>
          <p>{movie?.tagline}</p>
          <div className={css.numberCharacteristics}>
            { movie?.release_date && <span>{new Date(movie.release_date).getFullYear()}</span>}
            <span>{movie?.runtime} min</span>
          </div>
          <div>{movie?.overview}</div>
        </div>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  getMovie: PropTypes.func.isRequired,
};
