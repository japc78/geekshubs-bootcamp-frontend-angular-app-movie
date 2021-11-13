export interface Images {
  base_url:        string;
  secure_base_url: string;
  backdrop_sizes:  string[];
  logo_sizes:      string[];
  poster_sizes:    string[];
  profile_sizes:   string[];
  still_sizes:     string[];
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