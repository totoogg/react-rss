import { FC, memo } from 'react';
import { Main } from '@/widgets';
import { ErrorResponse } from '@/entities';
import styles from './homePage.module.css';
import { selectIsError, useAppSelector } from '@/shared';

export const HomePage: FC = memo(() => {
  const isError = useAppSelector(selectIsError);

  return (
    <div className={styles.page}>
      {isError && <ErrorResponse />}
      {!isError && <Main />}
    </div>
  );
});

HomePage.displayName = 'HomePage';
