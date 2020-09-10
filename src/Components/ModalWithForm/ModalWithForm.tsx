import React, { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { Movie } from '../MovieCard';
import css from './ModalWithForm.less';

export function ModalWithForm({ movie, onReset, onSubmit }:
  { movie?: Movie, onReset: () => void, onSubmit: (formData: Partial<Movie>) => void },
) {
  const formType = movie ? 'edit' : 'add';
  const genres = [
    { label: 'Documentary', value: 'Documentary' },
    { label: 'Comedy', value: 'Comedy' },
    { label: 'Horror', value: 'Horror' },
    { label: 'Crime', value: 'Crime' },
  ];
  const [formData, setFormData] = useState<Partial<Movie>>(movie || {});

  const dropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <span className={css.selectIcon} />
      </components.DropdownIndicator>
    );
  };

  const handleFormChange = (event: ChangeEvent<HTMLElement>) => {
    const element = event.target as HTMLInputElement;

    if (element.name === 'date') {
      element.value ? element.classList.add(css.full) : element.classList.remove(css.full);
    }

    setFormData({
      ...formData,
      [element.name]: element.name === 'runtime' ? +element.value : element.value,
    });
  };

  const handleSelectChange = (options: { label: string; value: string }[]) => {
    setFormData({
      ...formData,
      genres: options.map(option => option.value),
    });
  };

  const formSubmit = () => {
    onSubmit(formData);
  };

  return (
    <>
      <h2>{formType.toUpperCase()} MOVIE</h2>
      <form onSubmit={formSubmit}>
        {formType === 'edit' && (
          <fieldset>
            <label>MOVIE ID</label>
            {movie.id}
          </fieldset>
        )}
        <fieldset>
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Movie title"
            value={formData.title}
            onChange={handleFormChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="release_date">RELEASE DATE</label>
          <input
            type="date"
            name="release_date"
            id="release_date"
            placeholder="Select release date"
            className={ formData.release_date ? css.full : '' }
            value={formData.release_date}
            onChange={handleFormChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="poster_path">MOVIE URL</label>
          <input
            type="text"
            name="poster_path"
            id="poster_path"
            placeholder="Movie url"
            value={formData.poster_path}
            onChange={handleFormChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="genres">GENRE</label>
          <Select
            id="genres"
            name="genres"
            isMulti={true}
            options={genres}
            classNamePrefix="react-select"
            components={{ DropdownIndicator: dropdownIndicator }}
            value={formData.genres?.map(genre => ({ label: genre, value: genre }))}
            onChange={handleSelectChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="overview">OVERVIEW</label>
          <input
            type="text"
            name="overview"
            id="overview"
            placeholder="Movie overview"
            value={formData.overview}
            onChange={handleFormChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="runtime">RUNTIME</label>
          <input
            type="number"
            name="runtime"
            id="runtime"
            placeholder="Movie runtime"
            value={formData.runtime}
            onChange={handleFormChange}
          />
        </fieldset>
        <div className={css.buttons}>
          <button onClick={onReset}>RESET</button>
          <input type="submit" data-ui="primary" value="SUBMIT" />
        </div>
      </form>
    </>
  );
}

ModalWithForm.propTypes = {
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
