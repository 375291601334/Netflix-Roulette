import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Logo, Footer } from '../../Components';
import { ErrorBoundary } from '../ErrorBoundary';
import MainPage, { NotFoundPage } from '../../Pages';
import css from './App.less';

export function App() {
  return (
    <>
      <Logo className={css.topLogo} />
      <ErrorBoundary>
        <Switch>
          <Route path="/films">
            <MainPage />
          </Route>
          <Route path="/search">
            <MainPage />
          </Route>
          <Redirect exact={true} from="/" to="/films"/>
          <Route component={NotFoundPage} />
        </Switch>
      </ErrorBoundary>
      <Footer>
        <Logo />
      </Footer>
    </>
  );
}
