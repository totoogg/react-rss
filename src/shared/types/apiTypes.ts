export type Api = ICountry[];

interface ICountry {
  name: IName;
  region: string;
  population: number;
  flag: string;
  flags: IFlags;
}

interface IName {
  common: string;
}

interface IFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface IApi {
  name: string;
  region: string;
  population: number;
  flag: string;
  flagString: string;
  flagAlt: string;
}
