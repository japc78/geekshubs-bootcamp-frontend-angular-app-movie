import { Config, SortBy, Language, Region } from '../classes/Config';

// FIXME Es posible keys con . o alguna manera de prescindir de las comillas
// para declarar las keys. De cara a pasar los valores con HttpParams
export interface IQuery {
  "api_key"?: Config.API_KEY;
  "language"?: Language;
  "sort_by"?: string;
  "vote_count.gte"?: number;
  "vote_count.lte"?: number;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  "with_genres"?: number;
  "page"?: number;
}

export interface QueryMovie extends IQuery {
  "primary_release_year"?: number;
  "year"?: number;
  "region"?: Region;
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
  "release_date.gte"?: string;
  "release_date.lte"?: string;
}

export interface QueryTv extends IQuery {
  "first_air_date_year"?: number;
  "air_date.gte"?: string;
  "air_date.lte"?: string;
  "first_air_date.gte"?: string;
  "first_air_date.lte"?: string;
}