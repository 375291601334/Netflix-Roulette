import React from 'react';
import Link from 'next/link';
import { Logo, Footer } from '../../Components';
import css from './NotFoundPage.less';

export function NotFoundPage() {
  return (
    <>
      <Logo className={css.topLogo} />
      <div className={css.container}>
        <div className={css.content}>
          <h2 className={css.title}>Page Not Found</h2>
          <span className={css.icon} />
          <Link href="/films" >
            <button className={css.homeButton}>GO BACK TO HOME</button>
          </Link>
        </div>
      </div>
      <Footer>
        <Logo />
      </Footer>
    </>
  );
}
