export class Film {
  id: number;
  title: string;
  shortTitle?: string;
  releaseDate?: string;
  year: number;
  posterPath: string;
  overview: string;
  shortOverview?: string;
  voteAverage?: number;
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
