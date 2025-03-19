import { FC } from 'react';
import { Header } from '@/widgets';
import styles from './layout.module.css';
import { HomePage } from '@/pages';

export const Layout: FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <HomePage />
    </div>
  );
};

Layout.displayName = 'Layout';
