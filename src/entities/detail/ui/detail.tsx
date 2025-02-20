import { FC, memo, useCallback, useEffect, useState } from 'react';
import { IDetailProps } from '../model/detailTypes';
import { Button, getFilms, Person, useGetFilmsQuery } from '@/shared';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useLazyGetHomeByIdQuery,
  useLazyGetPersonByIdQuery,
} from '../model/apiSliceWithPersonById';
import { ChoosePeople } from '@/features';
import styles from './detail.module.css';

export const Detail: FC<IDetailProps> = memo(({ id }) => {
  const [person, setPerson] = useState<Person>();
  const [home, setHome] = useState<string>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: films } = useGetFilmsQuery();
  const [getHome] = useLazyGetHomeByIdQuery();
  const [getPerson] = useLazyGetPersonByIdQuery();
  const [imgLoader, setImgLoader] = useState<boolean>(true);

  const handleImageLoaded = useCallback(() => {
    setImgLoader(false);
  }, []);

  const handleClick = useCallback(
    () => navigate(`/?${searchParams.toString()}`),
    [navigate, searchParams]
  );

  useEffect(() => {
    getPerson(id).then(({ data }) => {
      getHome(data?.homeworld?.split('/').reverse()[1] || '').then(
        ({ data }) => {
          setHome(data?.name);
        }
      );
      setPerson(data);
    });
  }, [getHome, getPerson, id]);

  return (
    <div className={styles.card}>
      <ChoosePeople
        birth_year={person?.birth_year || ''}
        films={[getFilms(person?.films || [], films || [])]}
        name={person?.name || ''}
        url={person?.url || ''}
        className={styles.choose}
      />

      <Button onClick={handleClick} className={styles.escape}>
        <span className={styles.line_escape} />
        <span className={styles.line_escape} />
      </Button>
      <img
        src={`https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/main/static/assets/img/people/${id}.jpg`}
        alt={person?.name}
        className={[styles.img, imgLoader ? styles['img-loader'] : ''].join(
          ' '
        )}
        onLoad={handleImageLoaded}
      />
      <div className={styles.description}>
        <span>
          <b>Name:</b> <i>{person?.name}</i>
        </span>
        <span>
          <b>Home planet:</b> <i>{home}</i>
        </span>
        <span>
          <b>Films:</b> <i>{getFilms(person?.films || [], films || [])}</i>
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
          <b>Birthday year:</b> <i>{person?.birth_year}</i>
        </span>
        <span>
          <b>Gender:</b> <i>{person?.gender}</i>
        </span>
      </div>
    </div>
  );
});

Detail.displayName = 'Detail';
