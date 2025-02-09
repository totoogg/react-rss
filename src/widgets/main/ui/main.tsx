import React, { FC, memo } from 'react';
import { IMainState } from '../model/mainType';
import { Card } from '@/entities';
import { getFilms, getSearchPeople } from '@/shared';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './main.module.css';
import { Pagination } from '@/features';

export const Main: FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = React.useState<IMainState>({
    results: [],
    films: [],
    count: '',
  });

  React.useEffect(() => {
    const changeLocalStorage = async () => {
      const local = localStorage.getItem('search');
      const page = location.search
        .split('&')
        .find((el) => el.includes('page'))
        ?.split('=')[1];

      const people = await getSearchPeople(local || '', page || '1');

      navigate({
        search: `?search=${local}&page=${page || '1'}`,
      });

      setState((state) => ({
        ...state,
        results: people.results,
        count: people.count,
      }));

      const res = await getFilms();

      setState((state) => ({
        ...state,
        films: res,
      }));
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', changeLocalStorage);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', changeLocalStorage);
      }
    };
  }, [location, location.search, navigate, state]);

  return (
    <div className={styles.main}>
      {+state.count > 10 ? <Pagination count={state.count} /> : ''}
      <div className={styles.gallery}>
        {state.results.length > 0 ? (
          state.results.map((item) => (
            <Link
              key={item.url}
              to={`people/${(item.url || '').slice(29, -1)}${location.search}`}
              className={styles['no-underline']}
            >
              <Card
                name={item.name || ''}
                url={item.url || ''}
                home={item.homeworld || ''}
                films={
                  state.films
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
      {+state.count > 10 ? <Pagination count={state.count} /> : ''}
    </div>
  );
});

Main.displayName = 'Main';
