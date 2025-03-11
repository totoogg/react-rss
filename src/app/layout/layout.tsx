import { FC, memo } from 'react';
import { Header } from '@/widgets';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';

export const Layout: FC = memo(() => {
  return (
    <div className={styles.layout}>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';
