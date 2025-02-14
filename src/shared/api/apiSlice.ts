import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { IApi, ICharacter, IFilm } from '../types';
import { addLoader, removeLoader } from './loader/loaderSlice';
import { showError } from './error/errorSlice';

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  api.dispatch(addLoader());

  try {
    const result = await fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' })(
      args,
      api,
      extraOptions
    );

    if (result.error) {
      throw new Error('Request');
    }

    return result;
  } catch (error) {
    api.dispatch(showError());
    throw error;
  } finally {
    api.dispatch(removeLoader());
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
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
