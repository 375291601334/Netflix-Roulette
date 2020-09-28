import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, useField } from 'formik';
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
            <FormField
              fieldName="title"
              type="string"
              label="TITLE"
              placeholder="Movie title"
              error={errors.title as string}
              touched={touched.title as boolean}
            />
            <FormField
              fieldName="release_date"
              type="date"
              label="RELEASE DATE"
              placeholder="Select release date"
              error={errors.release_date as string}
              touched={touched.release_date as boolean}
              className={
                `${values.release_date ? css.full : ''}
                ${errors.release_date && touched.release_date ? css.notValid : ''}`
              }
            />
            <FormField
              fieldName="poster_path"
              type="string"
              label="MOVIE URL"
              placeholder="Movie url"
              error={errors.poster_path as string}
              touched={touched.poster_path as boolean}
            />
            <FormField
              fieldName="genres"
              label="GENRE"
              error={errors.genres as string}
              touched={touched.genres as boolean}
            >
              <SelectField options={genres} name="genres" />
            </FormField>
            <FormField
              fieldName="overview"
              type="string"
              label="OVERVIEW"
              placeholder="Movie overview"
              error={errors.overview as string}
              touched={touched.overview as boolean}
            />
            <FormField
              fieldName="runtime"
              type="number"
              label="RUNTIME"
              placeholder="Movie runtime"
              error={errors.runtime as string}
              touched={touched.runtime as boolean}
            />
            <div className={css.buttons}>
              <button onClick={onReset}>RESET</button>
              <input type="submit" data-ui="primary" value="SUBMIT" disabled={!isValid || !dirty} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );

  function SelectField({ options, name }) {
    const [field, meta, helpers] = useField(name);

    const handleSelectChange = (option: Option[]) => {
      const values = option.reduce(
        (values, option) => {
          values.push(option.value);
          return values;
        },
        [],
      );

      helpers.setValue(values);
    };

    const handleMenuClose = () => {
      !meta.touched && helpers.setTouched(true);
    };

    return (
      <>
        <Select
          name={name}
          isMulti={true}
          options={options}
          className={meta.error && meta.touched ? css.notValid : ''}
          classNamePrefix="react-select"
          components={{ DropdownIndicator: dropdownIndicator }}
          value={(field.value || []).map(genre => ({ label: genre, value: genre }))}
          onChange={handleSelectChange}
          onMenuClose={handleMenuClose}
        />
      </>
    );
  }

  function FormField({ fieldName, type, label, placeholder, error, touched, className, children }:
    {
      fieldName: string;
      label: string;
      error: string;
      touched: boolean;
      type?: string;
      placeholder?: string;
      className?: string;
      children?: JSX.Element;
    },
  ) {
    return (
      <fieldset>
        <label htmlFor={fieldName}>{label}</label>
        {children || (
          <Field
            name={fieldName}
            type={type}
            placeholder={placeholder}
            className={`${className} ${error && touched && css.notValid}`}
          />
        )}
        {error && touched
          ? (<div className={css.error}>{error}</div>)
          : null
        }
      </fieldset>
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
