import { Wrapper } from './_wrapper';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string; page: string }>;
}) {
  const { search = '', page = 1 } = await searchParams;
  const res = await Promise.all([
    fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`),
    fetch(`https://swapi.dev/api/films`),
  ]);
  const dataPeople = await res[0].json();
  const dataFilms = await res[1].json();

  return (
    <Wrapper
      preloadedState={{
        films: dataFilms,
        people: dataPeople,
      }}
    />
  );
}

export const dynamic = 'force-dynamic';
