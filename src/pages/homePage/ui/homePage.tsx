import { FC, memo } from 'react';
import styles from './homePage.module.css';

export const HomePage: FC = memo(() => {
  return <div className={styles.page}></div>;
});

HomePage.displayName = 'HomePage';
