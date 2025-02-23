export interface IApi {
  count: number;
  next: string | null;
  previous: string | null;
  results: ICharacter[];
}

export interface ICharacter {
  name: string;
  birth_year: string;
  films: string[];
  url: string;
  title?: string;
}

export interface Person extends ICharacter {
  homeworld: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
}

export interface IFilm {
  title: string;
  url: string;
}
