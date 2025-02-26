import { Detail } from '@/entities';
import { getFilms, Person, useGetFilmsQuery } from '@/shared';
import { FC, memo, useEffect, useState } from 'react';
import {
  useLazyGetHomeByIdQuery,
  useLazyGetPersonByIdQuery,
} from '../model/apiSliceWithPersonById';
import { ChoosePeople, Close, ToggleTheme } from '@/features';
import styles from './personDetail.module.css';
import { useRouter } from 'next/router';

export const PersonDetail: FC = memo(() => {
  const {
    query: { id: personId },
  } = useRouter();
  const [person, setPerson] = useState<Person>();
  const [home, setHome] = useState<string>();
  const { data: films } = useGetFilmsQuery();
  const [getHome] = useLazyGetHomeByIdQuery();
  const [getPerson] = useLazyGetPersonByIdQuery();

  useEffect(() => {
    getPerson(String(personId) || '').then(({ data }) => {
      getHome(data?.homeworld?.split('/').reverse()[1] || '').then(
        ({ data }) => {
          setHome(data?.name);
        }
      );
      setPerson(data);
    });
  }, [getHome, getPerson, personId]);

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
        home={home || ''}
        mass={person?.mass || ''}
        name={person?.name || ''}
        skin_color={person?.skin_color || ''}
      />
    </div>
  );
});

PersonDetail.displayName = 'PersonDetail';
