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
import { useSearchParams, Link } from 'react-router';
import { IPeopleListProps } from '../model/peopleListTypes';

export const PeopleList: FC<IPeopleListProps> = memo(({ people }) => {
  const [query] = useSearchParams();
  const page = query.get('page');
  const search = query.get('search');
  const { data } = useGetFilmsQuery();
  const dispatch = useAppDispatch();

  const filmsData = useCallback(
    (films: string[]) => getFilms(films || [], data?.results || []),
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
            to={`people/${(item.url || '').slice(29, -1)}?search=${search || ''}&page=${page || 1}`}
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
            films={[filmsData(item.films || [])]}
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
