import { Config, Genres, SortBy, Language, Region } from '../classes/Config';

// FIXME Es posible keys con . o alguna manera de prescindir de las comillas
// para declarar las keys. De cara a pasar los valores con HttpParams
export interface IQuery {
  "api_key"?: Config.API_KEY;
  "language"?: Language;
  "sort_by"?: SortBy;
  "vote_count.gte"?: number;
  "vote_count.lte"?: number;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  "with_genres"?: Genres;
  "page"?: number;
}

export interface QueryMovie extends IQuery {
  "primary_release_year"?: number;
  "year"?: number;
  "region"?: Region;
  "primary_release_date.gte"?: Date;
  "primary_release_date.lte"?: Date;
  "release_date.gte"?: Date;
  "release_date.lte"?: Date;
}

export interface QueryTv extends IQuery {
  "first_air_date_year"?: number;
  "air_date.gte"?: Date;
  "air_date.lte"?: Date;
  "first_air_date.gte"?: Date;
  "first_air_date.lte"?: Date;
}