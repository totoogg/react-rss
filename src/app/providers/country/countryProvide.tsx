import { FC, useState } from 'react';
import { ICountryProvider } from './countryProviderTypes';
import { CountryContext, Region, Sort } from '@/shared';

export const CountryProvide: FC<ICountryProvider> = ({ children }) => {
  const [search, setSearch] = useState<string>('');
  const [region, setRegion] = useState<Region>('');
  const [sort, setSort] = useState<Sort>('');

  const defaultValue = {
    search,
    setSearch,
    region,
    setRegion,
    sort,
    setSort,
  };

  return (
    <CountryContext.Provider value={defaultValue}>
      {children}
    </CountryContext.Provider>
  );
};
