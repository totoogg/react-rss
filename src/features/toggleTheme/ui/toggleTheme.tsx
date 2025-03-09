import { FC, memo, useCallback, useContext } from 'react';
import { Sun, Moon, ThemeContext } from '@/shared';
import styles from './toggleTheme.module.css';
import Image from 'next/image';

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
        <Image
          src={Sun}
          alt="Sun"
          className={styles.svg}
          width={44}
          height={44}
        />
      ) : (
        <Image
          src={Moon}
          alt="Moon"
          className={styles.svg}
          width={44}
          height={44}
        />
      )}
    </div>
  );
});

ToggleTheme.displayName = 'ToggleTheme';
