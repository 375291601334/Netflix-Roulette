import React from 'react';
import PropTypes from 'prop-types';
import css from './Logo.less';

export function Logo({ className }: { className?: string; }) {
  return <div className={`${css.logo} ${className}`}><span>netflix</span>roulette</div>;
}

Logo.propTypes = {
  className: PropTypes.string,
};
