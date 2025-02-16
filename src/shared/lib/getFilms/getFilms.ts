import { IFilm } from '@/shared/types';

export function getFilms(films: string[], fetchFilms: IFilm[]) {
  return (
    fetchFilms
      .filter((film) => films.some((url) => url === film.url))
      .map((film) => film.title)
      .join(', ') || ''
  );
}
