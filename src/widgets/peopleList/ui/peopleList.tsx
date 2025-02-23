import { FC } from 'react';
import { getFilms, useGetFilmsQuery, useSearchPeople } from '@/shared';
import { Link, useSearchParams } from 'react-router-dom';
import { Card } from '@/entities';
import { ChoosePeople } from '@/features';
import styles from './peopleList.module.css';

export const PeopleList: FC = () => {
  const [searchParams] = useSearchParams();
  const { data } = useGetFilmsQuery();
  const { people } = useSearchPeople();

  return (
    <>
      {people.map((item) => (
        <div className={styles.content} key={item.url}>
          <Link
            to={`people/${(item.url || '').slice(29, -1)}?${searchParams.toString()}`}
            className={styles['no-underline']}
          >
            <Card
              name={item.name || ''}
              url={item.url || ''}
              films={getFilms(item.films || [], data || [])}
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
};
