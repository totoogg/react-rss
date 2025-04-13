import { FC, memo, useContext, useMemo } from 'react';
import { ICountriesProps } from '../model/countriesTypes';
import { ChooseVisit } from '@/features';
import { CountryContext } from '@/shared';
import styles from './countriesList.module.css';
import { Card } from '@/entities';

export const CountriesList: FC<ICountriesProps> = memo(({ data }) => {
  const { search, region, sort } = useContext(CountryContext);

  const resultData = useMemo(
    () =>
      data
        .filter((item) => {
          const searchCountry = item.name
            .toLowerCase()
            .includes((search || '').toLowerCase());
          if (region && region !== 'All') {
            return item.region === region && searchCountry;
          }
          return searchCountry;
        })
        .sort((a, b) => {
          if (sort === 'nameCountryUp') {
            return b.name.localeCompare(a.name);
          } else if (sort === 'nameCountryDown') {
            return a.name.localeCompare(b.name);
          } else if (sort === 'populationUp') {
            return a.population - b.population;
          } else if (sort === 'populationDown') {
            return b.population - a.population;
          } else {
            return 0;
          }
        }),
    [data, region, search, sort]
  );

  return (
    <>
      {resultData.length === 0 ? (
        <div className={styles.notFound}>
          No countries with the name &quot;
          {search}
          &quot; were found
        </div>
      ) : (
        <>
          {resultData.map((item) => (
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
});

CountriesList.displayName = 'CountriesList';
