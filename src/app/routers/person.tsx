import { useLoaderData } from 'react-router';
import { Wrapper } from './wrappers/personWrapper';
import { IApi, ICharacter, IFilm, Person } from '@/shared';

export interface IProps {
  people?: Pick<IApi, 'count'> &
    Record<'results', ICharacter[]> &
    Partial<{ detail: string }>;
  films?: { results: IFilm[] } & Partial<{ detail: string }>;
  person?: Person & Partial<{ detail: string }>;
  home?: { name: string } & Partial<{ detail: string }>;
}

export async function loader({
  request,
  params,
}: {
  request: { url: string };
  params: { personId: string };
}) {
  const id = params.personId;
  const query = new URL(request.url).searchParams;
  const page = query.get('page') || 1;
  const search = query.get('search') || '';
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
  return {
    films: dataFilms,
    people: dataPeople,
    home: dataHome,
    person: dataPerson,
  };
}

export default function Component() {
  const { films, people, home, person } = useLoaderData();
  return (
    <Wrapper
      preloadedState={{
        films,
        people,
        home,
        person,
      }}
    />
  );
}
