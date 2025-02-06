import { FC, memo } from 'react';
import { ILayoutProps } from '../types/layoutTypes';
import { Footer, Header } from '@/widgets';

export const Layout: FC<ILayoutProps> = memo(({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
});

Layout.displayName = 'Layout';
