import { MediaType, Language } from '../classes/Config';
export interface MediaResponse {
  page:          number;
  results:       Media[];
  total_pages:   number;
  total_results: number;
}

export interface Media {
  release_date?:      Date;
  adult?:             boolean;
  backdrop_path:      string;
  genre_ids:          number[];
  vote_count:         number;
  original_language?: Language;
  original_title?:    string;
  poster_path:        string;
  video?:             boolean;
  id:                 number;
  vote_average:       number;
  title?:             string;
  overview:           string;
  popularity:         number;
  media_type:         MediaType.movie | MediaType.tv;
  first_air_date?:    Date;
  name?:              string;
  original_name?:     string;
  origin_country?:    string[];
  logo?:              string | null;
  trailer?:           string | null;
}