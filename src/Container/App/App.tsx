import React from 'react';
import { Header, Navigation, MovieCard, Footer, Logo, Movie } from '../../Components';
import { ErrorBoundary } from '../ErrorBoundary';
import css from './App.less';

export class App extends React.Component<
  {}, {
    searchString: string,
    movies: Movie[],
    genre: string,
    sortingOption: string,
    readyToShowMovies: Movie[],
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      movies: [],
      genre: 'All',
      sortingOption: 'release_date',
      readyToShowMovies: [],
    };
  }

  componentDidMount() {
    const movies = require('../../movies.json');
    this.setState({ movies });
    this.setReadyToShowMovies({ movies });
  }

  componentWillUnmount() {
    console.log('App Component is unmountinting');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state === nextState ? false : true;
  }

  addMovie = (newMovie: Movie) => {
    const movies = [...this.state.movies, newMovie];
    this.setState({ movies });
    this.setReadyToShowMovies({ movies });
  }

  editMovie = (editedMovie: Movie) => {
    const movies = this.state.movies.map((movie) => {
      if (movie.id === editedMovie.id) {
        return editedMovie;
      }
      return movie;
    });
    this.setState({ movies });
    this.setReadyToShowMovies({ movies });
  }

  deleteMovie = (id: Movie['id']) => {
    const movies = this.state.movies.filter(movie => movie.id !== id);
    this.setState({ movies });
    this.setReadyToShowMovies({ movies });
  }

  changeGenre = (genre: string) => {
    this.setState({ genre });
    this.setReadyToShowMovies({ genre });
  }

  changeSortingOption = (option: string) => {
    this.setState({ sortingOption: option });
    this.setReadyToShowMovies({ sortingOption: option });
  }

  changeSearchString = (searchString: string) => {
    this.setState({ searchString });
    this.setReadyToShowMovies({ searchString });
  }

  setReadyToShowMovies = (
    data: { movies?: Movie[]; searchString?: string; sortingOption?: string; genre?: string },
  ) => {
    const { movies, searchString, sortingOption, genre } = { ...this.state, ...data };
    const readyToShowMovies = movies
      .filter(movie => movie.title.toLocaleLowerCase().includes(searchString.toLowerCase()))
      .filter(movie => genre === 'All' || movie.genres.includes(genre))
      .sort((first, second) => {
        if (first[sortingOption] > second[sortingOption]) return -1;
        if (first[sortingOption] === second[sortingOption]) return 0;
        if (first[sortingOption] < second[sortingOption]) return 1;
      });
    this.setState({ readyToShowMovies });
  }

  render() {
    return (
      <>
        <Header addMovie={this.addMovie} searchMovie={this.changeSearchString}/>
        <ErrorBoundary>
          <main>
            <Navigation
              moviesNumber={this.state.readyToShowMovies.length}
              changeGenre={this.changeGenre}
              changeSortingOption={this.changeSortingOption}
            />
            <div className={css.moviesContainer}>
              {this.state.readyToShowMovies.map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    deleteMovie={this.deleteMovie}
                    editMovie={this.editMovie}
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
  }
}
