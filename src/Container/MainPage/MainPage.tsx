import React, { useCallback, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { actions } from '../../Store';
import { Header, MovieCard, MovieDetails, Navigation, Movie } from '../../Components';
import css from './MainPage.less';

function MainPage(
  {
    loading,
    error,
    movies,
    addMovie,
    updateMovie,
    deleteMovie,
    setFilteringOption,
    setSortingOption,
  }: {
    loading: boolean;
    error: null | Error;
    movies: Movie[];
    addMovie: (movie: Movie) => void;
    updateMovie: (movie: Movie) => void;
    deleteMovie: (movieId: number) => void;
    setFilteringOption: (filteringOption: string) => void;
    setSortingOption: (sortingOption: string) => void;
  },
) {
  const router = useRouter();
  const { id } = router.query;

  const onDeleteMovie = (id: Movie['id']) => {
    deleteMovie(id);
  };

  const changeGenre = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const container = event.currentTarget;
      const element = event.target as HTMLElement;
      if (element === container) return;

      Array.from(container.getElementsByClassName(css.active)).map(
        element => element.classList.remove(css.active),
      );
      element.classList.add(css.active);

      setFilteringOption(element.dataset.value);
    },
    [],
  );

  const changeSortingOption = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSortingOption(event.currentTarget.value);
    },
    [],
  );

  const getSelectedMovie = (id: string) => {
    const selectedMovie = movies.find(movie => movie.id === + id);
    if (!selectedMovie) {
      router.push('/films');
    }
    return selectedMovie;
  };

  return (
    <>
      {id ? <MovieDetails getMovie={getSelectedMovie} /> : <Header addMovie={addMovie} />}
      <main>
        <Navigation
          moviesNumber={movies.length}
          changeGenre={changeGenre}
          changeSortingOption={changeSortingOption}
          activeGenreClass={css.active}
        />

          {loading && <div className={css.loader} />}
          {!loading && (
            <>
              {!error && (
                <div className={css.moviesContainer}>
                  {movies.map((movie) => {
                    return (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        deleteMovie={onDeleteMovie}
                        editMovie={updateMovie}
                      />
                    );
                  })}
                </div>
              )}
              {!error && !movies.length && (
                <h3 className={css.message}>No movies found</h3>
              )}
              {error && (
                <h3 className={css.message}>Error has occured! Try again in few minutes...</h3>
              )}
            </>
          )}

      </main>
    </>
  );
}

export function mapStateToProps({ movies, filtering, sorting }) {
  const { data, loading, error } = movies;
  return {
    loading,
    error,
    movies: data
      .filter(movie => filtering === 'All' || movie.genres.includes(filtering))
      .sort((first, second) => {
        if (first[sorting] > second[sorting]) return -1;
        if (first[sorting] === second[sorting]) return 0;
        if (first[sorting] < second[sorting]) return 1;
      }),
  };
}

const mapDispatchToProps = dispatch => ({
  deleteMovie: (movieID) => {
    fetch(`http://localhost:4000/movies/${movieID}`, { method: 'DELETE' })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          dispatch(actions.fetchMoviesFailure(response.statusText));
          return;
        }
        dispatch(actions.deleteMovie(movieID));
      });
  },

  updateMovie: (movie) => {
    fetch('http://localhost:4000/movies', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(movie) })
      .then((response) => {
        if (!response.ok) {
          dispatch(actions.fetchMoviesFailure(response.statusText));
          return;
        }
        dispatch(actions.updateMovie(movie));
      });
  },

  addMovie: (movie) => {
    fetch('http://localhost:4000/movies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(movie) })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then((json) => {
        dispatch(actions.addMovie(json));
        return json.data;
      })
      .catch(error => dispatch(actions.fetchMoviesFailure(error)));
  },

  setFilteringOption: filteringOption => dispatch(actions.setFilteringOption(filteringOption)),
  setSortingOption: sortingOption => dispatch(actions.setSortingOption(sortingOption)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
