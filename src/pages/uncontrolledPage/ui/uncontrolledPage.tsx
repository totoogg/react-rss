import { UncontrolledForm } from '@/widgets';
import { FC, memo } from 'react';
import styles from './uncontrolledPage.module.css';

export const UncontrolledPage: FC = memo(() => {
  return (
    <div className={styles.wrapper}>
      <UncontrolledForm />
    </div>
  );
});

UncontrolledPage.displayName = 'UncontrolledPage';
