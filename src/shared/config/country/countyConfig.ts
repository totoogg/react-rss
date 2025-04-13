import { createContext } from 'react';

export type Region =
  | 'Antarctic'
  | 'Americas'
  | 'Europe'
  | 'Africa'
  | 'Asia'
  | 'Oceania'
  | 'All'
  | '';

export type Sort =
  | 'populationUp'
  | 'populationDown'
  | 'nameCountryUp'
  | 'nameCountryDown'
  | '';

export interface ICountryContext {
  search?: string;
  setSearch?: (search: string) => void;
  region?: Region;
  setRegion?: (region: Region) => void;
  sort?: Sort;
  setSort?: (sort: Sort) => void;
}

export const CountryContext = createContext<ICountryContext>({});
