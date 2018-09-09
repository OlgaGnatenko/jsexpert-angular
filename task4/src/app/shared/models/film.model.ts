export class Film {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
  shortTitle?: string;
  shortOverview?: string;
  favorite?: boolean;
  year?: number;
}
