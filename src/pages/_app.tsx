import React from 'react';
import Head from 'next/head';

export default function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/clapperboard.ico" type="image/x-icon" />
        <title>Netflix Roulette</title>
      </Head>
      <Component {...pageProps} />
      <div id="modalWindow" />
    </>
  );
}
