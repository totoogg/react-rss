import { FC, useState } from 'react';
import { ICardProps } from '../model/cardTypes';
import styles from './card.module.css';

export const Card: FC<ICardProps> = ({
  data: { flag, flagAlt, flagString, name, population, region },
  children,
}) => {
  const [imgLoader, setImgLoader] = useState<boolean>(true);

  const handleImageLoaded = () => {
    setImgLoader(false);
  };

  return (
    <div className={styles.card}>
      <img
        width={300}
        height={200}
        src={flag}
        alt={flagAlt}
        className={[styles.image, imgLoader ? styles['img-loader'] : ''].join(
          ' '
        )}
        onLoad={handleImageLoaded}
      />
      <div className={styles.description}>
        <span>
          <b>Country name:</b> <i>{name}</i>
        </span>
        <span>
          <b>Population:</b> <i>{population}</i>
        </span>
        <span>
          <b>Region:</b> <i>{region}</i>
        </span>
        <span>
          <b>Flag:</b> <i>{flagString}</i>
        </span>
        {children}
      </div>
    </div>
  );
};

Card.displayName = 'Card';
