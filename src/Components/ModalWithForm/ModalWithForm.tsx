import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { Movie } from '../MovieCard';
import css from './ModalWithForm.less';

export class ModalWithForm extends React.Component<
  { movie?: Movie, onReset: () => void, onSubmit: (formData: Partial<Movie>) => void },
  { type: 'add' | 'edit', formData: Partial<Movie> }
> {
  public static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
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
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.movie ? 'edit' : 'add',
      formData: this.props.movie || {},
    };
  }

  genres = [
    { label: 'Documentary', value: 'Documentary' },
    { label: 'Comedy', value: 'Comedy' },
    { label: 'Horror', value: 'Horror' },
    { label: 'Crime', value: 'Crime' },
  ];

  dropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <span className={css.selectIcon} />
      </components.DropdownIndicator>
    );
  }

  handleFormChange = (event: ChangeEvent<HTMLElement>) => {
    const element = event.target as HTMLInputElement;
    const formData = {
      ...this.state.formData,
      [element.name]: element.name === 'runtime' ? +element.value : element.value,
    };

    if (element.name === 'date') {
      element.value ? element.classList.add(css.full) : element.classList.remove(css.full);
    }

    this.setState({ formData });
  }

  handleSelectChange = (options: { label: string; value: string }[]) => {
    const formData = {
      ...this.state.formData,
      genres: options.map(option => option.value),
    };
    this.setState({ formData });
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.formData);
  }

  render() {
    return (
      <>
        <h2>{this.state.type.toUpperCase()} MOVIE</h2>
        <form onSubmit={this.onSubmit}>
          {this.state.type === 'edit' && (
            <fieldset>
              <label>MOVIE ID</label>
              {this.props.movie.id}
            </fieldset>
          )}
          <fieldset>
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Movie title"
              value={this.state.formData.title}
              onChange={this.handleFormChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="release_date">RELEASE DATE</label>
            <input
              type="date"
              name="release_date"
              id="release_date"
              placeholder="Select release date"
              className={ this.state.formData.release_date ? css.full : '' }
              value={this.state.formData.release_date}
              onChange={this.handleFormChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="poster_path">MOVIE URL</label>
            <input
              type="text"
              name="poster_path"
              id="poster_path"
              placeholder="Movie url"
              value={this.state.formData.poster_path}
              onChange={this.handleFormChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="genres">GENRE</label>
            <Select
              id="genres"
              name="genres"
              isMulti={true}
              options={this.genres}
              classNamePrefix="react-select"
              components={{ DropdownIndicator: this.dropdownIndicator }}
              value={this.state.formData.genres?.map(genre => ({ label: genre, value: genre }))}
              onChange={this.handleSelectChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="overview">OVERVIEW</label>
            <input
              type="text"
              name="overview"
              id="overview"
              placeholder="Movie overview"
              value={this.state.formData.overview}
              onChange={this.handleFormChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="runtime">RUNTIME</label>
            <input
              type="number"
              name="runtime"
              id="runtime"
              placeholder="Movie runtime"
              value={this.state.formData.runtime}
              onChange={this.handleFormChange}
            />
          </fieldset>
          <div className={css.buttons}>
            <button onClick={this.props.onReset}>RESET</button>
            <input type="submit" data-ui="primary" value="SUBMIT" />
          </div>
        </form>
      </>
    );
  }
}
