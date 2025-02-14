import { FC, memo, useCallback } from 'react';
import { IDetailProps } from '../model/detailTypes';
import { Button, useGetFilmsQuery } from '@/shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './detail.module.css';
import {
  useGetHomeByIdQuery,
  useGetPersonByIdQuery,
} from '../model/apiSliceWithPersonById';

export const Detail: FC<IDetailProps> = memo(({ id }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: films } = useGetFilmsQuery();
  const { data: person } = useGetPersonByIdQuery(id);
  const { data: home } = useGetHomeByIdQuery(id);

  const handleImageLoaded = () => {
    //todo
  };

  const handleClick = useCallback(
    () => navigate(`/?${searchParams.toString()}`),
    [navigate, searchParams]
  );

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
