import { FC, memo, useEffect } from 'react';
import { Main, PeopleList } from '@/widgets';
import { ErrorResponse } from '@/entities';
import {
  removeLoader,
  selectIsError,
  useAppDispatch,
  useAppSelector,
  useGetPeopleQuery,
} from '@/shared';
import styles from './homePage.module.css';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query';

export const HomePage: FC = memo(() => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { search, page } = router.query;
  const { data, isSuccess } = useGetPeopleQuery(
    typeof search === 'string'
      ? { search: String(search), page: Number(page) }
      : skipToken,
    {
      skip: router.isFallback,
    }
  );
  const isError = useAppSelector(selectIsError);

  useEffect(() => {
    if (isSuccess) {
      dispatch(removeLoader());
    }
  }, [dispatch, isSuccess]);

  return (
    <div className={styles.page}>
      {isError && <ErrorResponse />}
      {!isError && isSuccess && (
        <Main count={data?.count || 0}>
          <PeopleList people={data?.people || []} />
        </Main>
      )}
    </div>
  );
});

HomePage.displayName = 'HomePage';
