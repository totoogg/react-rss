import { FC, memo, useContext } from 'react';
import { ILayoutProps } from '../types';
import { Footer, Header } from '@/widgets';
import { Outlet } from 'react-router';
import { ThemeContext } from '@/shared';
import styles from './layout.module.css';

const Layout: FC<ILayoutProps> = memo(({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[styles.layout, theme !== 'light' ? styles.moon : ''].join(
        ' '
      )}
    >
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
export default Layout;
