import { FC, memo } from 'react';
import styles from './errorResponse.module.css';

export const ErrorResponse: FC = memo(() => {
  return (
    <div className={styles.error}>
      <div className={styles.errorText}>
        Something went wrong. Please try again later.
      </div>
    </div>
  );
});

ErrorResponse.displayName = 'ErrorResponse';
