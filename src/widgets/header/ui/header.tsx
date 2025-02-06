import { FC, memo } from 'react';
import { Search } from '@/features';
import styles from './header.module.css';

export const Header: FC = memo(() => {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <Search />
      </div>
    </div>
  );
});

Header.displayName = 'Header';
