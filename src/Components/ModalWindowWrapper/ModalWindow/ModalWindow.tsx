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
    document.getElementById('modalWindow').classList.add(css.wrapper);
    document.getElementById('modalWindow').appendChild(this.state.element);
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.setProperty('overflow', 'auto');

    document.getElementById('modalWindow').removeChild(this.state.element);
    document.getElementById('modalWindow').classList.remove(css.wrapper);
  }

  render() {
    return createPortal(this.props.children, this.state.element);
  }
}
