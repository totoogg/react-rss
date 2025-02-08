import React, { FC, memo } from 'react';
import { IMainState } from '../model/mainType';
import { Card } from '@/entities';
import { getFilms, getSearchPeople, getStartPeople } from '@/shared';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './main.module.css';

export const Main: FC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = React.useState<IMainState>({
    results: [],
    films: [],
  });

  React.useEffect(() => {
    const changeLocalStorage = async () => {
      const local = localStorage.getItem('search');

      if (local) {
        const res = await getSearchPeople(local);

        navigate({
          search: `?search=${local}`,
        });

        setState((state) => ({
          ...state,
          results: res,
        }));
      } else {
        const res = await getStartPeople();

        navigate({
          search: ``,
        });

        setState((state) => ({
          ...state,
          results: res,
        }));
      }

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
  }, [navigate, state]);

  return (
    <div className={styles.gallery}>
      {state.results.length > 0 ? (
        state.results.map((item) => (
          <Link
            key={item.url}
            to={`people/${(item.url || '').slice(29, -1)}${location.search}`}
          >
            <Card
              name={item.name || ''}
              url={item.url || ''}
              home={item.homeworld || ''}
              films={
                state.films
                  .filter((film) => item.films?.some((url) => url === film.url))
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
  );
});

Main.displayName = 'Main';
