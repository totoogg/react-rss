import { FC, memo } from 'react';
import { Search, ToggleTheme } from '@/features';
import styles from './header.module.css';
import { IHeaderProps } from '../model/headerTypes';

export const Header: FC<IHeaderProps> = memo(({ setTheme, theme }) => {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <Search />
        <ToggleTheme setTheme={setTheme} theme={theme || ''} />
      </div>
    </div>
  );
});

Header.displayName = 'Header';
