import { Api, IApi } from '@/shared/types';
import { apiSlice } from '../apiSlice';

export const apiSliceWithCountries = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<IApi[], void>({
      query: () => 'all',
      transformResponse(res: Api) {
        return res.map((item) => ({
          name: item.name.common,
          region: item.region,
          population: item.population,
          flag: item.flags.png,
          flagString: item.flag,
          flagAlt: item.flags.alt || item.name.common,
        }));
      },
    }),
  }),
});

export const { useGetCountriesQuery } = apiSliceWithCountries;
