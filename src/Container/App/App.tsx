import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Header, Navigation, MovieCard, Footer, Logo, Movie, MovieDetails } from '../../Components';
import { ErrorBoundary } from '../ErrorBoundary';
import { actions } from '../../Store';
import css from './App.less';

function AppComponent({
  movies, loading, error,
  fetchMovies, addMovie, updateMovie, deleteMovie, setFilteringOption, setSortingOption,
}) {
  const [readyToShowMovies, setReadyMovies] = useState<Movie[]>([]);
  const [selectedMovieID, setSelectedMovieID] = useState<number>(undefined);
  const [searchString, setSearchString] = useState<string>('');

  useEffect(
    () => {
      fetchMovies();
    },
    [],
  );

  useEffect(
    () => {
      const readyToShowMovies = movies.filter(
        movie => movie.title.toLocaleLowerCase().includes(searchString.toLowerCase()),
      );
      setReadyMovies(readyToShowMovies);
    },
    [searchString, movies],
  );

  const onDeleteMovie = (id: Movie['id']) => {
    unselectMovie();
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

  const changeSearchString = useCallback(
    (searchString: string) => {
      setSearchString(searchString);
    },
    [],
  );

  const selectMovie = (id: Movie['id']) => {
    setSelectedMovieID(id);
  };

  const unselectMovie = () => {
    setSelectedMovieID(undefined);
  };

  return (
    <>
      {selectedMovieID ? (
        <MovieDetails
          selectedMovie={movies.find(({ id }) => id === selectedMovieID)}
          unselectMovie={unselectMovie}
        />
      ) : (
        <Header addMovie={addMovie} searchMovie={changeSearchString}/>
      )}
      <ErrorBoundary>
        <main>
          <Navigation
            moviesNumber={readyToShowMovies.length}
            changeGenre={changeGenre}
            changeSortingOption={changeSortingOption}
            activeGenreClass={css.active}
          />
          {loading ? <div className={css.loader} /> :
          error ? (
            <h3>Error has occured!!! Please try again in few minutes...</h3>
          ) : movies.length > 0 ? (
            <div className={css.moviesContainer}>
              {readyToShowMovies.map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    deleteMovie={onDeleteMovie}
                    editMovie={updateMovie}
                    selectMovie={selectMovie}
                  />
                );
              })}
            </div>
          ) : (
            <h3>No movies were found, add your own movies by clicking ADD MOVIE button.</h3>
          )}
        </main>
      </ErrorBoundary>
      <Footer>
        <Logo />
      </Footer>
    </>
  );
}

function mapStateToProps({ movies, filtering, sorting }) {
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
  fetchMovies: () => {
    dispatch(actions.fetchMovies());
    return fetch('http://localhost:4000/movies')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then((json) => {
        dispatch(actions.fetchMoviesSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(actions.fetchMoviesFailure(error)));
  },

  deleteMovie: (movieID) => {
    fetch(`http://localhost:4000/movies/${movieID}`, { method: 'DELETE' })
      .then((response) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
