import { FC, memo } from 'react';
import { Main, PeopleList } from '@/widgets';
import { ErrorResponse } from '@/entities';
import { selectIsError, useAppSelector } from '@/shared';
import styles from './homePage.module.css';

export const HomePage: FC = memo(() => {
  const isError = useAppSelector(selectIsError);

  return (
    <div className={styles.page}>
      {isError && <ErrorResponse />}
      {!isError && (
        <Main>
          <PeopleList />
        </Main>
      )}
    </div>
  );
});

HomePage.displayName = 'HomePage';
