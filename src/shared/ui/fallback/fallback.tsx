import { FC } from 'react';
import styles from './fallback.module.css';

export const Fallback: FC = () => {
  return <div className={styles.message}>Something went wrong!</div>;
};

Fallback.displayName = 'Fallback';
