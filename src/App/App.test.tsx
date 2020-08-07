import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('App', () => {
  test('render App', () => {
    expect(mount(<App />)).toBeTruthy();
  });
});
