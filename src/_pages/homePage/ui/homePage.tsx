import { FC, memo } from 'react';
import { Main, PeopleList } from '@/widgets';
import { ErrorResponse } from '@/entities';
import { selectIsError, useAppSelector, useSearchPeople } from '@/shared';
import styles from './homePage.module.css';

export const HomePage: FC = memo(() => {
  const { count, people } = useSearchPeople();
  const isError = useAppSelector(selectIsError);

  return (
    <div className={styles.page}>
      {isError && <ErrorResponse />}
      {!isError && (
        <Main count={count}>
          <PeopleList people={people} />
        </Main>
      )}
    </div>
  );
});

HomePage.displayName = 'HomePage';
