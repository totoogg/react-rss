import { Character, IFilm } from '@/shared/types/apiTypes';

export interface IMainState {
  results: Character[];
  films: IFilm[];
  count: string;
}
