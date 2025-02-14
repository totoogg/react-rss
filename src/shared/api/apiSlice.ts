import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApi, ICharacter, IFilm } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getFilms: builder.query<IFilm[], void>({
      query: () => 'films',
      transformResponse(res: IApi) {
        return res.results.map((item) => ({
          title: item.title || '',
          url: item.url || '',
        }));
      },
    }),
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

export const { useGetFilmsQuery, useLazyGetPeopleQuery } = apiSlice;
