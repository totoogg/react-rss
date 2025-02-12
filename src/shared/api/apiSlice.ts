import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApi, IFilm } from '../types/apiTypes';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<IFilm[], unknown>({
      query: () => 'films',
      transformResponse(res: IApi) {
        return res.results.map((item) => ({
          title: item.title || '',
          url: item.url || '',
        }));
      },
    }),
  }),
});

export const { useGetPostsQuery } = apiSlice;
