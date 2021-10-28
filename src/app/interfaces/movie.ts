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
  vote_average:          number;
  vote_count:            number;
  logo:                  string;
}

export interface ImagesResponse {
  backdrops: Backdrop[];
  id:        number;
  logos:     Backdrop[];
  posters:   Backdrop[];
}

export interface Backdrop {
  aspect_ratio: number;
  height:       number;
  iso_639_1:    null | string;
  file_path:    string;
  vote_average: number;
  vote_count:   number;
  width:        number;
}


export interface Dates {
  maximum: Date;
  minimum: Date;
}

export interface Genre {
  id:   number;
  name: string;
}

export interface ProductionCompany {
  id:             number;
  logo_path:      string;
  name:           string;
  origin_country: string;
}

export enum OriginalLanguage {
  En = "en",
  Es = "es",
  Fr = "fr",
  Ko = "ko",
}

