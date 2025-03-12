import { FC, memo } from 'react';
import styles from './homePage.module.css';
import { Content } from '@/widgets';

export const HomePage: FC = memo(() => {
  return (
    <div className={styles.page}>
      <Content />
    </div>
  );
});

HomePage.displayName = 'HomePage';
