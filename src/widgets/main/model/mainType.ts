import { Character } from '@/shared/types/apiTypes';

export interface IMainState {
  results: Character[];
  films: film[];
}

export interface film {
  title: string;
  url: string;
}
