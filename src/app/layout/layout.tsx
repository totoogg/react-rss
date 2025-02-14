import { FC, memo } from 'react';
import { ILayoutProps } from '../types';
import { Footer, Header } from '@/widgets';
import { Outlet } from 'react-router-dom';

export const Layout: FC<ILayoutProps> = memo(({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
});

Layout.displayName = 'Layout';
