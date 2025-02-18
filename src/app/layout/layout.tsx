import { FC, memo, useCallback, useContext } from 'react';
import { ILayoutProps } from '../types';
import { Footer, Header } from '@/widgets';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '@/entities';
import styles from './layout.module.css';

export const Layout: FC<ILayoutProps> = memo(({ children }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    if (setTheme) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }, [setTheme, theme]);

  return (
    <div
      className={[styles.layout, theme !== 'light' ? styles.moon : ''].join(
        ' '
      )}
    >
      <Header setTheme={toggleTheme} theme={theme || ''} />
      <div>{children}</div>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';
