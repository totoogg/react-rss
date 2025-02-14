import { Person } from '@/shared';
import { apiSlice } from '@/shared';

export const apiSliceWithPeople = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonById: builder.query<Person, string>({
      query: (id) => `people/${id}`,
      transformResponse(res: Person) {
        return {
          name: res.name,
          birth_year: res.birth_year,
          films: res.films,
          url: res.url,
          homeworld: res.homeworld,
          height: res.height,
          mass: res.mass,
          hair_color: res.hair_color,
          skin_color: res.skin_color,
          eye_color: res.eye_color,
          gender: res.gender,
        };
      },
    }),
    getHomeById: builder.query<{ name: string }, string>({
      queryFn: async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        return data.name;
      },
    }),
  }),
});

export const { useGetPersonByIdQuery, useGetHomeByIdQuery } =
  apiSliceWithPeople;
