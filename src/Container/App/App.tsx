import React from 'react';
import { NextPageContext } from 'next';
import { Provider } from 'react-redux';
import { actions, initializeStore, useStore, State } from '../../Store';
import { Logo, Footer } from '../../Components';
import { ErrorBoundary } from '../ErrorBoundary';
import MainPage from '../MainPage';
import css from './App.less';

export function App({ state, searchString }: { state?: State, searchString?: string }) {
  const store = state ? useStore(state) : initializeStore();

  return (
    <Provider store={store}>
      <>
        <Logo className={css.topLogo} />
        <ErrorBoundary>
          <MainPage searchString={searchString} />
        </ErrorBoundary>
        <Footer>
          <Logo />
        </Footer>
      </>
    </Provider>
  );
}

export async function getServerSideProps({ query }: NextPageContext) {
  const { searchString, id } = query;
  let store;

  if (!id) {
    store = initializeStore();
    store.dispatch(actions.fetchMovies());

    await fetch(`http://localhost:4000/movies?limit=18${searchString && `&searchBy=title&search=${searchString}`}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then((json) => {
        store.dispatch(actions.fetchMoviesSuccess(json.data));
        return json.data;
      })
      .catch(error => store.dispatch(actions.fetchMoviesFailure(error.message)));
  }

  return {
    props: {
      state: store?.getState() || null,
    },
  };
}
