import { IApi, ICharacter } from '@/shared/types';
import { apiSlice } from '../apiSlice';

export const apiSliceWithPeople = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPeople: builder.query<
      Pick<IApi, 'count'> & Record<'results', ICharacter[]>,
      { search: string; page: number }
    >({
      query: ({ search, page }) => `people/?search=${search}&page=${page}`,
    }),
  }),
});

export const { useLazyGetPeopleQuery, useGetPeopleQuery } = apiSliceWithPeople;
