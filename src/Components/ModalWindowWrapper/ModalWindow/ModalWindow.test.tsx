import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModalWindow } from './ModalWindow';

describe('ModalWindow', () => {
  test('render modal window with its content', () => {
    const { container } = render(
      <body>
        <div id="modalWindow" />
        <ModalWindow><span>Content</span></ModalWindow>
      </body>,
    );

    expect(document.getElementsByTagName('body')[0].style.getPropertyValue('overflow')).toBe('hidden');
    expect(container.getElementsByClassName('wrapper')[0]).toBeTruthy();
    expect(container.getElementsByClassName('wrapper')[0].innerHTML).toBe('<div class="modalWindow"><span>Content</span></div>');
  });
});
