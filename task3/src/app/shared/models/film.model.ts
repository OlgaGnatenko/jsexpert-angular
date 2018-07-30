export class Film {
  id: number;
  name: string;
  year: number;
  imgUrl: string;
  description: string;
  favorite?: boolean;
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
