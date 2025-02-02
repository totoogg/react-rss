import { Character, film } from '@/shared/types/apiTypes';

export interface IMainState {
  results: Character[];
  films: film[];
}
