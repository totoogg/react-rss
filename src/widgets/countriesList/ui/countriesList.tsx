import { FC } from 'react';
import styles from './countriesList.module.css';
import { ICountriesProps } from '../model/countriesTypes';
import { Card } from '@/entities/card';
import { ChooseVisit } from '@/features';

export const CountriesList: FC<ICountriesProps> = ({ data }) => {
  return (
    <>
      {data.length === 0 ? (
        'Todo'
      ) : (
        <>
          {data.map((item) => (
            <div className={styles.content} key={item.name}>
              <Card data={item}>
                <span className={styles.visit}>
                  <b>Visited:</b>{' '}
                  <ChooseVisit name={item.name} className={styles.choose} />
                </span>
              </Card>
            </div>
          ))}
        </>
      )}
    </>
  );
};

CountriesList.displayName = 'CountriesList';
