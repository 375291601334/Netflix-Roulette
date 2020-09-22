import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import Select, { components } from 'react-select';
import { Movie } from '../MovieCard';
import css from './ModalWithForm.less';
import { Option } from 'react-select/src/filters';

const formValidationSchema = Yup.object().shape({
  title: Yup.string().required('This fileld is required!!!'),
  release_date: Yup.date().required('This fileld is required!!!'),
  poster_path: Yup.string().url('This field must be url!!!').required('This fileld is required!!!'),
  overview: Yup.string().required('This fileld is required!!!'),
  genres: Yup.array().of(Yup.string()).required('This fileld is required!!!'),
  runtime: Yup.number().min(0).integer().required('This fileld is required!!!'),
});

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

  const dropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <span className={css.selectIcon} />
      </components.DropdownIndicator>
    );
  };

  const formSubmit = (values) => {
    onSubmit({ ...movie, ...values });
  };

  return (
    <>
      <h2>{formType.toUpperCase()} MOVIE</h2>
      <Formik
        initialValues={movie || {}}
        validationSchema={formValidationSchema}
        onSubmit={formSubmit}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <Form>
            {formType === 'edit' && (
              <fieldset>
                <label>MOVIE ID</label>
                {movie.id}
              </fieldset>
            )}
            <fieldset>
              <label htmlFor="title">TITLE</label>
              <Field
                name="title"
                placeholder="Movie title"
                className={errors.title && touched.title && css.notValid}
              />
              {errors.title && touched.title
                ? (<div className={css.error}>{errors.title}</div>)
                : null
              }
            </fieldset>
            <fieldset>
              <label htmlFor="release_date">RELEASE DATE</label>
              <Field
                type="date"
                name="release_date"
                placeholder="Select release date"
                className={
                  `${values.release_date ? css.full : ''}
                  ${errors.release_date && touched.release_date ? css.notValid : ''}`
                }
              />
              {errors.release_date && touched.release_date
                ? (<div className={css.error}>{errors.release_date}</div>)
                : null
              }
            </fieldset>
            <fieldset>
              <label htmlFor="poster_path">MOVIE URL</label>
              <Field
                name="poster_path"
                placeholder="Movie url"
                className={errors.poster_path && touched.poster_path ? css.notValid : ''}
              />
              {errors.poster_path && touched.poster_path
                ? (<div className={css.error}>{errors.poster_path}</div>)
                : null
              }
            </fieldset>
            <fieldset>
              <label htmlFor="genres">GENRE</label>
              <Field
                name="genres"
                component={SelectField}
                options={genres}
              />
              {errors.genres && touched.genres
                ? (<div className={css.error}>{errors.genres}</div>)
                : null
              }
            </fieldset>
            <fieldset>
              <label htmlFor="overview">OVERVIEW</label>
              <Field
                name="overview"
                placeholder="Movie overview"
                className={errors.overview && touched.overview ? css.notValid : ''}
              />
              {errors.overview && touched.overview
                ? (<div className={css.error}>{errors.overview}</div>)
                : null
              }
            </fieldset>
            <fieldset>
              <label htmlFor="runtime">RUNTIME</label>
              <Field
                type="number"
                name="runtime"
                placeholder="Movie runtime"
                className={errors.runtime && touched.runtime ? css.notValid : ''}
              />
              {errors.runtime && touched.runtime
                ? (<div className={css.error}>{errors.runtime}</div>)
                : null
              }
            </fieldset>
            <div className={css.buttons}>
              <button onClick={onReset}>RESET</button>
              <input type="submit" data-ui="primary" value="SUBMIT" disabled={!isValid || !dirty} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );

  function SelectField({ options, field, form }) {
    const handleSelectChange = (option: Option[]) => {
      const values = option.reduce(
        (values, option) => {
          values.push(option.value);
          return values;
        },
        [],
      );

      form.setFieldValue(field.name, values);
      !form.touched[field.name] && form.setFieldTouched(field.name, true);
    };

    return (
      <Select
        name={field.name}
        isMulti={true}
        options={options}
        className={form.errors.genres && form.touched.genres ? css.notValid : ''}
        classNamePrefix="react-select"
        components={{ DropdownIndicator: dropdownIndicator }}
        value={(field.value || []).map(genre => ({ label: genre, value: genre }))}
        onChange={handleSelectChange}
      />
    );
  }
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
