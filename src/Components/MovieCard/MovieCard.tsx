import React from 'react';
import PropTypes from 'prop-types';
import { ModalWithForm } from '../ModalWithForm';
import { DeleteModal } from '../DeleteModal';
import { ModalWindowWrapper } from '../ModalWindowWrapper';
import { Movie } from './Movie.model';
import css from './MovieCard.less';

export class MovieCard extends React.Component<
  { movie: Movie, deleteMovie: (id: Movie['id']) => void, editMovie: (movie: Movie) => void },
  { showEditModal: boolean, showDeleteModal: boolean }
> {
  public static propTypes = {
    movie: PropTypes.exact({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      vote_count: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
      revenue: PropTypes.number.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
      runtime: PropTypes.number.isRequired,
    }).isRequired,
    deleteMovie: PropTypes.func.isRequired,
    editMovie: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { showEditModal: false, showDeleteModal: false };
  }

  openMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    ((event.target as HTMLElement).nextElementSibling as HTMLElement).style.setProperty('display', 'block');
  }

  closeMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    ((event.currentTarget as HTMLElement).parentElement as HTMLElement).style.setProperty('display', 'none');
  }

  openEditModal = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setState({ showEditModal: true });
    this.closeMenu(event);
  }

  closeEditModal = () => {
    this.setState({ showEditModal: false });
  }

  openDeleteModal = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setState({ showDeleteModal: true });
    this.closeMenu(event);
  }

  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  }

  onEditSubmit = (formData: Partial<Movie>) => {
    this.props.editMovie({ ...this.props.movie, ...formData });
    this.closeEditModal();
  }

  onDeleteConfirm = () => {
    this.props.deleteMovie(this.props.movie.id);
    this.closeDeleteModal();
  }

  render() {
    return (
      <>
        <div className={css.card}>
          <span className={css.menuIcon} onClick={this.openMenu}>⋮</span>
          <div className={css.menu}>
            <button className={css.closeButton} onClick={this.closeMenu}>
              <span className={css.closeIcon}>+</span>
            </button>
            <div className={css.option} onClick={this.openEditModal}>Edit</div>
            <div className={css.option} onClick={this.openDeleteModal}>Delete</div>
          </div>

          <img src={this.props.movie.poster_path} alt={`${this.props.movie.title} poster`} />
          <div className={css.mainInfoContainer}>
            <h4>{this.props.movie.title}</h4>
            <span className={css.date}>
              {new Date(this.props.movie.release_date).getFullYear()}
            </span>
          </div>
          <p>{this.props.movie.genres.join(', ')}</p>
        </div>
        {
          this.state.showDeleteModal ? (
            <ModalWindowWrapper onClose={this.closeDeleteModal}>
              <DeleteModal onConfirm={this.onDeleteConfirm} />
            </ModalWindowWrapper>
          ) : null
        }
        {
          this.state.showEditModal ? (
            <ModalWindowWrapper onClose={this.closeEditModal}>
              <ModalWithForm
                movie={this.props.movie}
                onReset={this.closeEditModal}
                onSubmit={this.onEditSubmit}
              />
            </ModalWindowWrapper>
          ) : null
        }
      </>
    );
  }
}
