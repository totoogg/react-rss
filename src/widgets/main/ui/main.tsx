import { FC, memo } from 'react';
import { Card } from '@/entities';
import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from '@/features';
import { useGetFilmsQuery, useSearchPeople } from '@/shared';
import styles from './main.module.css';

export const Main: FC = memo(() => {
  const { data } = useGetFilmsQuery();
  const { count, people } = useSearchPeople();
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.main}>
      {+count > 10 ? <Pagination count={String(count)} /> : ''}
      <div className={styles.gallery}>
        {people.length > 0 ? (
          people.map((item) => (
            <Link
              key={item.url}
              to={`people/${(item.url || '').slice(29, -1)}?${searchParams.toString()}`}
              className={styles['no-underline']}
            >
              <Card
                name={item.name || ''}
                url={item.url || ''}
                films={
                  (data || [])
                    .filter((film) =>
                      item.films?.some((url) => url === film.url)
                    )
                    .map((film) => film.title)
                    .join(', ') || ''
                }
                birthdayYear={item.birth_year || ''}
              />
            </Link>
          ))
        ) : (
          <div className={styles.notFound}>
            No characters with the name &quot;
            {localStorage.getItem('search')}
            &quot; found
          </div>
        )}
      </div>
      {+count > 10 ? <Pagination count={String(count)} /> : ''}
    </div>
  );
});

Main.displayName = 'Main';
