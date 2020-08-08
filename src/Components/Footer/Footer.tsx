import React from 'react';
import PropTypes from 'prop-types';
import './Footer.less';

export function Footer(props) {
  return (
    <footer>{props.children}</footer>
  );
}

Footer.propTypes = {
  children: PropTypes.element.isRequired,
};
