import React, { FC, memo } from 'react';
import { ICardProps } from '../model/detailTypes';
import { addCount, getHome, minusCount } from '@/shared';
import styles from './detail.module.css';

export const Card: FC<ICardProps> = memo(
  ({ birthdayYear, films, home, name, url }) => {
    const [homePlanet, setHomePlanet] = React.useState<string>('');

    const handleImageLoaded = () => {
      minusCount();
      minusCount();
    };

    React.useEffect(() => {
      const changeLocalStorage = async () => {
        const res = await getHome(home);

        setHomePlanet(res || '');
      };

      changeLocalStorage();
      addCount();
    }, [home]);

    return (
      <div className={styles.card}>
        <img
          src={`https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/main/static/assets/img/people/${url.slice(29, -1)}.jpg`}
          alt={name}
          onLoad={handleImageLoaded}
        />
        <div className={styles.description}>
          <span>
            <b>Name:</b> <i>{name}</i>
          </span>
          <span>
            <b>Home planet:</b> <i>{homePlanet}</i>
          </span>
          <span>
            <b>Films:</b> <i>{films}</i>
          </span>
          <span>
            <b>Birthday year:</b> <i>{birthdayYear}</i>
          </span>
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
