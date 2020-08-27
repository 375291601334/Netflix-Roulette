import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { Logo } from '../Logo';
import { Movie } from '../MovieCard';
import { ModalWithForm } from '../ModalWithForm';
import { CongratulationsModal } from '../CongratulationsModal';
import { ModalWindowWrapper } from '../ModalWindowWrapper';
import css from './Header.less';

export class Header extends React.Component<
  { addMovie: (newMovie: Movie) => void, searchMovie: (searchString: string) => void },
  { showAddModal: boolean, showCongratulationsModal: boolean, searchString: string }
> {
  public static propTypes = {
    addMovie: PropTypes.func.isRequired,
    searchMovie: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { showAddModal: false, showCongratulationsModal: false, searchString: '' };
  }

  openAddModal = () => {
    this.setState({ showAddModal: true });
  }

  closeAddModal = () => {
    this.setState({ showAddModal: false });
  }

  submitAddForm = (formData: Partial<Movie>) => {
    const newMovie = {
      ...formData,
      id: new Date().getTime(),
      tagline: '',
      vote_average: +(Math.random() * 10).toFixed(1),
      vote_count: Math.round(Math.random() * 1000),
      budget: Math.round(+Math.random().toFixed(2) * Math.pow(10, 9)),
      revenue: Math.round(Math.random() * Math.pow(10, 9)),
    } as Movie;
    this.props.addMovie(newMovie);
    this.setState({ showAddModal: false, showCongratulationsModal: true });
  }

  closeCongratulationsModal = () => {
    this.setState({ showCongratulationsModal: false });
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchString: event.target.value });
  }

  onSearch = () => {
    this.props.searchMovie(this.state.searchString);
  }

  render() {
    return (
      <header>
        <Logo />
        <button className={css.addButton} onClick={this.openAddModal}>+ ADD MOVIE</button>
        <div className={css.searchContainer}>
          <label>FIND YOUR MOVIE</label>
          <div className={css.search}>
            <input
              type="text"
              placeholder="What do you want to watch?"
              onChange={this.handleInputChange}
            />
            <button onClick={this.onSearch}>SEARCH</button>
          </div>
        </div>

        {
          this.state.showAddModal ? (
            <ModalWindowWrapper onClose={this.closeAddModal}>
              <ModalWithForm onReset={this.closeAddModal} onSubmit={this.submitAddForm}/>
            </ModalWindowWrapper>
          ) : null
        }
        {
          this.state.showCongratulationsModal ? (
            <ModalWindowWrapper onClose={this.closeCongratulationsModal}>
              <CongratulationsModal />
            </ModalWindowWrapper>
          ) : null
        }
      </header>
    );
  }
}
