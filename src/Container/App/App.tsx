import React from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { Logo } from '../../Components/Logo';
import { PageContent } from '../PageContent';
import { ErrorBoundary } from '../ErrorBoundary';
import './App.less';

export function App() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <PageContent key={'pageContent'} />
      </ErrorBoundary>
      <Footer>
        <Logo key={'logo'} />
      </Footer>
    </>
  );
}
