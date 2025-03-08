import { IApi, ICharacter, IFilm } from '@/shared';
import { Wrapper } from './wrappers/homeWrapper';
import { useLoaderData } from 'react-router';

export interface IProps {
  people?: Pick<IApi, 'count'> &
    Record<'results', ICharacter[]> &
    Partial<{ detail: string }>;
  films?: { results: IFilm[] } & Partial<{ detail: string }>;
}

export async function loader({ request }: { request: { url: string } }) {
  const query = new URL(request.url).searchParams;
  const page = query.get('page') || 1;
  const search = query.get('search') || '';
  const res = await Promise.all([
    fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`),
    fetch(`https://swapi.dev/api/films`),
  ]);
  const dataPeople = await res[0].json();
  const dataFilms = await res[1].json();

  return { films: dataFilms, people: dataPeople };
}

export default function Component() {
  const { films, people } = useLoaderData();
  return (
    <Wrapper
      preloadedState={{
        films,
        people,
      }}
    />
  );
}
