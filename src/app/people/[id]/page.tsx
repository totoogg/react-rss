import { Wrapper } from './_wrapper';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ search: string; page: string }>;
}) {
  const { id } = await params;
  const { search = '', page = 1 } = await searchParams;
  const res = await Promise.all([
    fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`),
    fetch(`https://swapi.dev/api/films`),
    fetch(`https://swapi.dev/api/people/${id}`),
  ]);
  const dataPeople = await res[0].json();
  const dataFilms = await res[1].json();
  const dataPerson = await res[2].json();
  const homeId = dataPerson.homeworld.split('/')[5];
  const home = await fetch(`https://swapi.dev/api/planets/${homeId}`);
  const dataHome = await home.json();

  return (
    <Wrapper
      preloadedState={{
        person: dataPerson,
        home: dataHome,
        films: dataFilms,
        people: dataPeople,
      }}
    />
  );
}

export const dynamic = 'force-dynamic';
