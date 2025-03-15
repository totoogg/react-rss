import { ControlledForm } from '@/widgets';
import { FC, memo } from 'react';
import styles from './controlledPage.module.css';

export const ControlledPage: FC = memo(() => {
  return (
    <div className={styles.wrapper}>
      <ControlledForm />
    </div>
  );
});

ControlledPage.displayName = 'ControlledPage';
