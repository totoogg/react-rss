import { FC, memo, useContext } from 'react';
import { ILayoutProps } from '../types';
import { Footer, Header } from '@/widgets';
import { ThemeContext } from '@/shared';
import styles from './layout.module.css';

export const Layout: FC<ILayoutProps> = memo(({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[styles.layout, theme !== 'light' ? styles.moon : ''].join(
        ' '
      )}
    >
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';
