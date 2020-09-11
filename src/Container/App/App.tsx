import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { addMovie, updateMovie, deleteMovie } from '../../Store';
import { Header, Navigation, MovieCard, Footer, Logo, Movie, MovieDetails } from '../../Components';
import { ErrorBoundary } from '../ErrorBoundary';
import css from './App.less';

const AppComponent = ({ movies, addMovie, updateMovie, deleteMovie }) => {
  const [readyToShowMovies, setReadyMovies] = useState<Movie[]>([]);
  const [selectedMovieID, setSelectedMovieID] = useState<number>(undefined);
  const [searchString, setSearchString] = useState<string>('');
  const [genre, setGenre] = useState<string>('All');
  const [sortingOption, setSortingOption] = useState<string>('release_date');

  useEffect(
    () => {
      const readyToShowMovies = movies
        .filter(movie =>
          movie.title.toLocaleLowerCase().includes(searchString.toLowerCase()),
        )
        .filter(movie => genre === 'All' || movie.genres.includes(genre))
        .sort((first, second) => {
          if (first[sortingOption] > second[sortingOption]) return -1;
          if (first[sortingOption] === second[sortingOption]) return 0;
          if (first[sortingOption] < second[sortingOption]) return 1;
        });

      setReadyMovies(readyToShowMovies);
    },
    [movies, searchString, genre, sortingOption],
  );

  const addMovie = (newMovie: Movie) => {
    dispatch(addMovie(newMovie));
  };

  const editMovie = (editedMovie: Movie) => {
    dispatch(updateMovie(editedMovie));
  };

  const deleteMovie = (id: Movie['id']) => {
    unselectMovie();
    this.props.deleteMovie(id);
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

      setGenre(element.dataset.value);
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
          <div className={css.moviesContainer}>
            {readyToShowMovies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  deleteMovie={deleteMovie}
                  editMovie={editMovie}
                  selectMovie={selectMovie}
                />
              );
            })}
          </div>
        </main>
      </ErrorBoundary>
      <Footer>
        <Logo />
      </Footer>
    </>
  );
};

function mapStateToProps(state) {
  return { movies: state };
}

export const App = connect(mapStateToProps, { addMovie, updateMovie, deleteMovie })(AppComponent);
