export interface IApi {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export interface Character {
  title?: string;
  name?: string;
  birth_year?: string;
  homeworld?: string;
  films?: string[];
  url?: string;
}

export interface Person extends Character {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
}

export interface film {
  title: string;
  url: string;
}
