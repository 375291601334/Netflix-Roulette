import React from 'react';
import { Navigation } from '../../Components/Navigation';
import { MovieCard } from '../../Components/MovieCard';
import css from './PageContent.less';

export function PageContent() {
  const moviesNumber = 39;
  const movies = require('../../movies.json');

  return (
    <main>
      <Navigation moviesNumber={moviesNumber} />
      <div className={css.moviesContainer}>
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </main>
  );
}
