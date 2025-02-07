import React, { FC, memo } from 'react';
import { IDetailProps } from '../model/detailTypes';
import {
  addCount,
  getFilms,
  getHome,
  getPersonById,
  minusCount,
} from '@/shared';
import styles from './detail.module.css';
import { film, Person } from '@/shared/types/apiTypes';

export const Detail: FC<IDetailProps> = memo(({ id }) => {
  const [person, setPerson] = React.useState<Person>();
  const [home, setHome] = React.useState<Person>();
  const [films, setFilms] = React.useState<film[]>();

  const handleImageLoaded = () => {
    minusCount();
    minusCount();
  };

  React.useEffect(() => {
    const getPerson = async () => {
      const res = await Promise.all([getPersonById(id), getFilms()]);
      const homePlanet = await getHome(res[0].homeworld);

      setPerson(res[0] || '');
      setHome(homePlanet || '');
      setFilms(res[1] || '');
    };

    getPerson();
    addCount();
  }, [id]);

  return (
    <div className={styles.card}>
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
