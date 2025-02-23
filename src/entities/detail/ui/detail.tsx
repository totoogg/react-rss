import { FC, memo, useCallback, useState } from 'react';
import { IDetailProps } from '../model/detailTypes';
import styles from './detail.module.css';

export const Detail: FC<IDetailProps> = memo(
  ({
    id,
    birth_year,
    eye_color,
    films,
    gender,
    hair_color,
    height,
    home,
    mass,
    name,
    skin_color,
  }) => {
    const [imgLoader, setImgLoader] = useState<boolean>(true);

    const handleImageLoaded = useCallback(() => {
      setImgLoader(false);
    }, []);

    return (
      <>
        <img
          src={`https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/main/static/assets/img/people/${id}.jpg`}
          alt={name}
          className={[styles.img, imgLoader ? styles['img-loader'] : ''].join(
            ' '
          )}
          onLoad={handleImageLoaded}
        />
        <div className={styles.description}>
          <span>
            <b>Name:</b> <i>{name}</i>
          </span>
          <span>
            <b>Home planet:</b> <i>{home}</i>
          </span>
          <span>
            <b>Films:</b> <i>{films}</i>
          </span>
          <span>
            <b>Height:</b> <i>{height}</i>
          </span>
          <span>
            <b>Mass:</b> <i>{mass}</i>
          </span>
          <span>
            <b>Hair color:</b> <i>{hair_color}</i>
          </span>
          <span>
            <b>Skin color:</b> <i>{skin_color}</i>
          </span>
          <span>
            <b>Eye color:</b> <i>{eye_color}</i>
          </span>
          <span>
            <b>Birthday year:</b> <i>{birth_year}</i>
          </span>
          <span>
            <b>Gender:</b> <i>{gender}</i>
          </span>
        </div>
      </>
    );
  }
);

Detail.displayName = 'Detail';
