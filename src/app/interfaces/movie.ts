import { Genre } from './Genre';

export interface MovieResponse {
  dates?:         Dates;
  page:          number;
  results:       Movie[];
  total_pages:   number;
  total_results: number;
}

export interface Movie {
  adult:                 boolean;
  backdrop_path:         string;
  budget:                number;
  genres:                Genre[];
  homepage:              string;
  id:                    number;
  imdb_id:               string;
  logo:                  string | null;
  original_language:     string;
  original_title:        string;
  overview:              string;
  popularity:            number;
  poster_path:           string;
  release_date:          Date;
  revenue:               number;
  runtime:               number;
  status:                string;
  tagline:               string;
  title:                 string;
  video:                 boolean;
  trailer:               string | null;
  vote_average:          number;
  vote_count:            number;
}

export interface Dates {
  maximum: Date;
  minimum: Date;
}

export interface ProductionCompany {
  id:             number;
  logo_path:      string;
  name:           string;
  origin_country: string;
}
