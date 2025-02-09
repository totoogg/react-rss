import React, { FC, memo } from 'react';
import { Main } from '@/widgets';
import { ErrorResponse } from '@/entities';
import styles from './homePage.module.css';

export const HomePage: FC = memo(() => {
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const showResponse = () => {
      setIsError(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('customErrorResponse', showResponse);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('customErrorResponse', showResponse);
      }
    };
  }, []);

  return (
    <div className={styles.page}>
      {isError && <ErrorResponse />}
      {!isError && <Main />}
    </div>
  );
});

HomePage.displayName = 'HomePage';
