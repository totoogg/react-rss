import { FC } from 'react';
import styles from './errorResponse.module.css';

export const ErrorResponse: FC = () => {
  return (
    <div className={styles.error}>
      <div className={styles.errorText}>
        Something went wrong. Please try again later.
      </div>
    </div>
  );
};

ErrorResponse.displayName = 'ErrorResponse';
