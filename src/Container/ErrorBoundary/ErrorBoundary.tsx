import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends Component<{ children: JSX.Element }, { hasError: boolean }> {
  public static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong... Please, try again in 1 minute</h1>;
    }

    return this.props.children;
  }
}
