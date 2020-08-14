import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './ModalWindow.less';

const modalRoot = document.getElementById('modalWindow');

export class ModalWindow extends React.Component<
  { children?: JSX.Element }, { element: HTMLDivElement }
> {
  public static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    const element = document.createElement('div');
    element.className = css.modalWindow;
    this.state = { element };
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.setProperty('overflow', 'hidden');
    modalRoot.classList.add(css.wrapper);
    modalRoot.appendChild(this.state.element);
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.setProperty('overflow', 'auto');

    modalRoot.removeChild(this.state.element);
    modalRoot.classList.remove(css.wrapper);
  }

  render() {
    return createPortal(this.props.children, this.state.element);
  }
}
