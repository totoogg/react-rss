import { FC } from 'react';
import { IMainProps } from '../model/mainType';
import styles from './main.module.css';
import { Loader, useGetCountriesQuery } from '@/shared';
import { ErrorResponse } from '@/entities';

export const Main: FC<IMainProps> = ({ children }) => {
  const { isError, isLoading } = useGetCountriesQuery();

  return (
    <div className={styles.main}>
      {isLoading && <Loader />}
      {isError && <ErrorResponse />}
      {!isLoading && !isError && (
        <div className={styles.gallery}>{children}</div>
      )}
    </div>
  );
};

Main.displayName = 'Main';
