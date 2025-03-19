import { FC, memo, useMemo, useState } from 'react';
import { ICountryProvider } from './countryProviderTypes';
import { CountryContext, Region, Sort } from '@/shared';

export const CountryProvide: FC<ICountryProvider> = memo(({ children }) => {
  const [search, setSearch] = useState<string>('');
  const [region, setRegion] = useState<Region>('');
  const [sort, setSort] = useState<Sort>('');

  const defaultValue = useMemo(
    () => ({
      search,
      setSearch,
      region,
      setRegion,
      sort,
      setSort,
    }),
    [region, search, sort]
  );

  return (
    <CountryContext.Provider value={defaultValue}>
      {children}
    </CountryContext.Provider>
  );
});

CountryProvide.displayName = 'CountryProvide';
