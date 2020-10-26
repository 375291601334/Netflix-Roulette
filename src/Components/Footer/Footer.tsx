import React from 'react';
import PropTypes from 'prop-types';
import './Footer.less';

export function Footer({ children }: { children: JSX.Element }) {
  return (
    <footer>{children}</footer>
  );
}

Footer.propTypes = {
  children: PropTypes.element.isRequired,
};
