import { FC, memo } from 'react';
import { ILayoutProps } from '../types';
import { Footer, Header } from '@/widgets';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared';
import { selectIsSun } from '@/features';
import styles from './layout.module.css';

export const Layout: FC<ILayoutProps> = memo(({ children }) => {
  const isSun = useAppSelector(selectIsSun);

  return (
    <div className={[styles.layout, !isSun ? styles.moon : ''].join(' ')}>
      <Header />
      <div>{children}</div>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';
