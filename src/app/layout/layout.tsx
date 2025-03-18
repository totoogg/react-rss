import { FC, useContext } from 'react';
import { Header } from '@/widgets';
import { ThemeContext } from '@/shared';
import styles from './layout.module.css';
import { HomePage } from '@/pages';

export const Layout: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[styles.layout, theme !== 'light' ? styles.moon : ''].join(
        ' '
      )}
    >
      <Header />
      <HomePage />
    </div>
  );
};

Layout.displayName = 'Layout';
