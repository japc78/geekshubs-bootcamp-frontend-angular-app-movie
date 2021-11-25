import { Genres, SortBy, Language, Region  } from '../classes/Config';

interface Query {
  language?:      Language;
  sort_by?:       SortBy;
  "vote_count.gte"?:    number;
  "vote_count.lte"?:    number;
  with_genres?:  Genres;
  page?: number;
}

export interface QueryMovie extends Query {
  primary_release_year?: number;
  year?:  number;
  region?:        Region;
  "primary_release_date.gte"?:   Date;
  "primary_release_date.lte"?:   Date;
  "release_date.gte"?:   Date;
  "release_date.lte"?:   Date;

}

export interface QueryTv extends Query {
  first_air_date_year?:  number;
  "air_date.gte"?:   Date;
  "air_date.lte"?:   Date;
  "first_air_date.gte"?:   Date;
  "first_air_date.lte"?:   Date;
}
