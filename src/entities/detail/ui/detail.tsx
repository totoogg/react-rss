import React, { FC, memo, useCallback } from 'react';
import { IDetailProps } from '../model/detailTypes';
import {
  addCount,
  Button,
  getFilms,
  getHome,
  getPersonById,
  minusCount,
} from '@/shared';
import { IFilm, Person } from '@/shared/types/apiTypes';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './detail.module.css';

export const Detail: FC<IDetailProps> = memo(({ id }) => {
  const [person, setPerson] = React.useState<Person>();
  const [home, setHome] = React.useState<Person>();
  const [films, setFilms] = React.useState<IFilm[]>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleImageLoaded = () => {
    minusCount();
    minusCount();
  };

  const handleClick = useCallback(
    () => navigate(`/${location.search}`),
    [location.search, navigate]
  );

  React.useEffect(() => {
    const getPerson = async () => {
      try {
        const res = await Promise.all([getPersonById(id), getFilms()]);

        const homePlanet = await getHome(res[0].homeworld);

        setPerson(res[0] || '');
        setHome(homePlanet || '');
        setFilms(res[1] || '');
      } catch {
        navigate(`/error${location.search}`);
      }
    };

    getPerson();
    addCount();
  }, [id, location.search, navigate]);

  return (
    <div className={styles.card}>
      <Button onClick={handleClick} className={[styles.escape]}>
        <span className={styles.line_escape} />
        <span className={styles.line_escape} />
      </Button>
      <img
        src={`https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/main/static/assets/img/people/${id}.jpg`}
        alt={person?.name}
        onLoad={handleImageLoaded}
      />
      <div className={styles.description}>
        <span>
          <b>Name:</b> <i>{person?.name}</i>
        </span>
        <span>
          <b>Home planet:</b> <i>{home?.name}</i>
        </span>
        <span>
          <b>Films:</b>{' '}
          <i>
            {films
              ?.filter((el) => person?.films?.includes(el.url))
              .map((el) => el.title)
              .join(', ')}
          </i>
        </span>
        <span>
          <b>Height:</b> <i>{person?.height}</i>
        </span>
        <span>
          <b>Mass:</b> <i>{person?.mass}</i>
        </span>
        <span>
          <b>Hair color:</b> <i>{person?.hair_color}</i>
        </span>
        <span>
          <b>Skin color:</b> <i>{person?.skin_color}</i>
        </span>
        <span>
          <b>Eye color:</b> <i>{person?.eye_color}</i>
        </span>
        <span>
          <b>Gender:</b> <i>{person?.gender}</i>
        </span>
      </div>
    </div>
  );
});

Detail.displayName = 'Detail';
