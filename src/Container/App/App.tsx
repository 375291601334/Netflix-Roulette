import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Header, Navigation, MovieCard, Footer, Logo, Movie, MovieDetails } from '../../Components';
import { ErrorBoundary } from '../ErrorBoundary';
import css from './App.less';
import { actionTypes } from '../../Store';

const AppComponent = ({
  movies, loading, error,
  fetchMovies, addMovie, updateMovie, deleteMovie, setFilteringOption, setSortingOption,
}) => {
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
          movie={movies.find(({ id }) => id === selectedMovieID)}
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
            <h3>No movies were loaded, add your own movies by clicking ADD MOVIE button.</h3>
          )}
        </main>
      </ErrorBoundary>
      <Footer>
        <Logo />
      </Footer>
    </>
  );
};

function mapStateToProps({ movies, filteringOption, sortingOption, loading, error }) {
  return {
    loading,
    error,
    movies: movies
      .filter(movie => filteringOption === 'All' || movie.genres.includes(filteringOption))
      .sort((first, second) => {
        if (first[sortingOption] > second[sortingOption]) return -1;
        if (first[sortingOption] === second[sortingOption]) return 0;
        if (first[sortingOption] < second[sortingOption]) return 1;
      }),
  };
}

const mapDispatchToProps = dispatch => ({
  fetchMovies: () => {
    dispatch({ type: actionTypes.FETCH_MOVIES });
    return fetch('http://localhost:4000/movies')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then((json) => {
        dispatch({ type: actionTypes.FETCH_MOVIES_SUCCESS, payload: json.data });
        return json.data;
      })
      .catch(error => dispatch({ type: actionTypes.FETCH_MOVIES_FAILURE, payload: error }));
  },

  deleteMovie: (movieID) => {
    dispatch({ type: actionTypes.DELETE_MOVIE, payload: movieID });
    fetch(`http://localhost:4000/movies/${movieID}`, { method: 'DELETE' });
  },
  updateMovie: (movie) => {
    dispatch({ type: actionTypes.UPDATE_MOVIE, payload: movie });
    fetch('http://localhost:4000/movies', { method: 'PUT', body: movie });
  },
  addMovie: (movie) => {
    dispatch({ type: actionTypes.ADD_MOVIE, payload: movie });
    fetch('http://localhost:4000/movies', { method: 'POST', body: movie });
  },

  setFilteringOption: filteringOption =>
    dispatch({ type: actionTypes.SET_FILTERING_OPTION, payload: filteringOption }),
  setSortingOption: sortingOption =>
    dispatch({ type: actionTypes.SET_SORTING_OPTION, payload: sortingOption }),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
