import { FC, memo } from 'react';
import { Search, ToggleTheme } from '@/features';
import styles from './header.module.css';

export const Header: FC = memo(() => {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <Search />
        <ToggleTheme />
      </div>
    </div>
  );
});

Header.displayName = 'Header';
