import { FC, useContext } from 'react';
import { Header } from '@/widgets';
import { ThemeContext } from '@/shared';
import styles from './layout.module.css';

export const Layout: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[styles.layout, theme !== 'light' ? styles.moon : ''].join(
        ' '
      )}
    >
      <Header />
      <div>main</div>
    </div>
  );
};

Layout.displayName = 'Layout';
