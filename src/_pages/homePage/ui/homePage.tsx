'use client';

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
import { useSearchParams } from 'next/navigation';
import { skipToken } from '@reduxjs/toolkit/query';

export const HomePage: FC = memo(() => {
  const query = useSearchParams();
  const dispatch = useAppDispatch();
  const search = query.get('search');
  const page = query.get('page');
  const { data, isSuccess } = useGetPeopleQuery(
    typeof search === 'string'
      ? { search: String(search), page: Number(page) }
      : skipToken,
    {
      skip: !query,
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
