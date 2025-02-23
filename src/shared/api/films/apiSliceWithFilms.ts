import { IFilm, IApi } from '@/shared/types';
import { apiSlice } from '../apiSlice';

export const apiSliceWithFilms = apiSlice.injectEndpoints({
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
  }),
});

export const { useGetFilmsQuery } = apiSliceWithFilms;
