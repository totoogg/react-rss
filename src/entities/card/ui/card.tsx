import { FC, memo } from 'react';
import { ICardProps } from '../model/cardTypes';
import { minusCount } from '@/shared';
import styles from './card.module.css';

export const Card: FC<ICardProps> = memo(
  ({ birthdayYear, films, name, url }) => {
    const handleImageLoaded = () => {
      minusCount();
      minusCount();
    };

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
