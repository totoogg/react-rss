import { FC } from 'react';
import { Main, CountriesList } from '@/widgets';
import styles from './homePage.module.css';
import { useGetCountriesQuery } from '@/shared';

export const HomePage: FC = () => {
  const { data } = useGetCountriesQuery();

  return (
    <div className={styles.page}>
      <Main>
        <CountriesList data={data || []} />
      </Main>
    </div>
  );
};

HomePage.displayName = 'HomePage';
