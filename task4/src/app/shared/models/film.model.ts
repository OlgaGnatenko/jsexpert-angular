export class Film {
  id: number;
  name: string;
  shortName?: string;
  year: number;
  imgUrl: string;
  description: string;
  shortDescription?: string;
  favorite?: boolean;
  rating?: number;
}

export interface SortingOption {
  value: string;
  viewValue: string;
}

export interface FilmListParams {
  filmsShown?: number;
  search?: string;
  sort?: string;
}

export interface FilmList {
  films: Array<Film>;
  lastPage: Boolean;
}
