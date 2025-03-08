import { IFilm } from '@/shared/types';
import { apiSlice } from '../apiSlice';

export const apiSliceWithFilms = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFilms: builder.query<{ results: IFilm[] }, void>({
      query: () => 'films',
    }),
  }),
});

export const { useGetFilmsQuery } = apiSliceWithFilms;
