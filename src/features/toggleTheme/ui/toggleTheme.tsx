import { FC, memo } from 'react';
import { Sun, Moon } from '@/shared';
import styles from './toggleTheme.module.css';
import { IToggleProps } from '../model/toggleThemeTypes';

export const ToggleTheme: FC<IToggleProps> = memo(({ setTheme, theme }) => {
  return (
    <div onClick={setTheme} className={styles.block}>
      {theme === 'light' ? (
        <Sun className={styles.svg} />
      ) : (
        <Moon className={styles.svg} />
      )}
    </div>
  );
});

ToggleTheme.displayName = 'ToggleTheme';
