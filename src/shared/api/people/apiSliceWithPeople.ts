import { IApi, ICharacter } from '@/shared/types';
import { apiSlice } from '../apiSlice';

export const apiSliceWithFilms = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPeople: builder.query<
      Pick<IApi, 'count'> & Record<'people', ICharacter[]>,
      { search: string; page: number }
    >({
      query: ({ search, page }) => `people/?search=${search}&page=${page}`,
      transformResponse(res: IApi) {
        const people = res.results.map((item) => ({
          name: item.name || '',
          url: item.url || '',
          films: item.films || [],
          birth_year: item.birth_year || '',
        }));
        return { count: res.count, people };
      },
    }),
  }),
});

export const { useLazyGetPeopleQuery } = apiSliceWithFilms;
