import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './Store';
import { App } from './Container/App';

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

console.log(process.env.PUBLIC_URL);

ReactDOM.render(
  (
    <BrowserRouter basename="/Netflix-Roulette">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  ),
  document.getElementById('root'));
