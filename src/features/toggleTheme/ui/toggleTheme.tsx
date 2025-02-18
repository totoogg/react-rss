import { FC, memo, useCallback, useContext } from 'react';
import { Sun, Moon, ThemeContext } from '@/shared';
import styles from './toggleTheme.module.css';

export const ToggleTheme: FC = memo(() => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    if (setTheme) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }, [setTheme, theme]);

  return (
    <div onClick={toggleTheme} className={styles.block}>
      {theme === 'light' ? (
        <Sun className={styles.svg} />
      ) : (
        <Moon className={styles.svg} />
      )}
    </div>
  );
});

ToggleTheme.displayName = 'ToggleTheme';
