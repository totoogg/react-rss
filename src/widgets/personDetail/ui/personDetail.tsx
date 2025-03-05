'use client';

import { Detail } from '@/entities';
import {
  getFilms,
  removeLoader,
  useAppDispatch,
  useGetFilmsQuery,
} from '@/shared';
import { FC, memo, useEffect } from 'react';
import {
  useGetHomeByIdQuery,
  useGetPersonByIdQuery,
} from '../model/apiSliceWithPersonById';
import { ChoosePeople, Close, ToggleTheme } from '@/features';
import styles from './personDetail.module.css';
import { useParams } from 'next/navigation';
import { skipToken } from '@reduxjs/toolkit/query';

export const PersonDetail: FC = memo(() => {
  const query = useParams();
  const personId = query.id;
  const dispatch = useAppDispatch();
  const { data: films } = useGetFilmsQuery();
  const { data: person, isSuccess: isPersonSuccess } = useGetPersonByIdQuery(
    typeof personId === 'string' ? personId : skipToken,
    {
      skip: !query,
    }
  );
  const { data: home, isSuccess: isHomeSuccess } = useGetHomeByIdQuery(
    typeof person?.homeworld === 'string'
      ? person.homeworld?.split('/').reverse()[1]
      : skipToken,
    {
      skip: !query,
    }
  );

  useEffect(() => {
    if (isPersonSuccess && isHomeSuccess) {
      dispatch(removeLoader());
    }
  }, [dispatch, isHomeSuccess, isPersonSuccess]);

  return (
    <div className={styles.card}>
      <div className={styles.buttons}>
        <ChoosePeople
          birth_year={person?.birth_year || ''}
          films={[getFilms(person?.films || [], films || [])]}
          name={person?.name || ''}
          url={person?.url || ''}
          className={styles.choose}
        />
        <ToggleTheme />
        <Close />
      </div>
      <Detail
        id={String(personId) || ''}
        birth_year={person?.birth_year || ''}
        eye_color={person?.eye_color || ''}
        films={getFilms(person?.films || [], films || [])}
        gender={person?.gender || ''}
        hair_color={person?.hair_color || ''}
        height={person?.height || ''}
        home={home?.name || ''}
        mass={person?.mass || ''}
        name={person?.name || ''}
        skin_color={person?.skin_color || ''}
      />
    </div>
  );
});

PersonDetail.displayName = 'PersonDetail';
