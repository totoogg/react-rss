import React, { FC, memo } from 'react';
import { IMainState } from '../model/mainType';
import { Card } from '@/entities';
import { getFilms, getSearchPeople, getStartPeople } from '@/shared';
import styles from './main.module.css';
import { useNavigate } from 'react-router-dom';

export const Main: FC = memo(() => {
  const navigate = useNavigate();
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
            key={item.url}
          />
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
