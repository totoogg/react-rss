import { FC, memo } from 'react';
import styles from './loader.module.css';

export const Loader: FC = memo(() => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
});

Loader.displayName = 'Loader';
