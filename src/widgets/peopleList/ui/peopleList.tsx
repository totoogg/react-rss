import { FC, memo, useCallback } from 'react';
import {
  addLoader,
  getFilms,
  useAppDispatch,
  useGetFilmsQuery,
} from '@/shared';
import { Card } from '@/entities';
import { ChoosePeople } from '@/features';
import styles from './peopleList.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IPeopleListProps } from '../model/peopleListTypes';

export const PeopleList: FC<IPeopleListProps> = memo(({ people }) => {
  const router = useRouter();
  const { data } = useGetFilmsQuery();
  const dispatch = useAppDispatch();

  const filmsData = useCallback(
    (films: string[]) => getFilms(films || [], data || []),
    [data]
  );

  const handleLinkClick = useCallback(() => {
    dispatch(addLoader());
  }, [dispatch]);

  return (
    <>
      {people.map((item) => (
        <div className={styles.content} key={item.url}>
          <Link
            href={`people/${(item.url || '').slice(29, -1)}?search=${router.query.search || ''}&page=${router.query.page || 1}`}
            className={styles['no-underline']}
            onClick={handleLinkClick}
          >
            <Card
              name={item.name || ''}
              url={item.url || ''}
              films={filmsData(item.films || [])}
              birthdayYear={item.birth_year || ''}
            />
          </Link>
          <ChoosePeople
            birth_year={item.birth_year}
            films={[getFilms(item.films || [], data || [])]}
            name={item.name}
            url={item.url}
            className={styles.choose}
          />
        </div>
      ))}
    </>
  );
});

PeopleList.displayName = 'PeopleList';
