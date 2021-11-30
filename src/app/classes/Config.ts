export enum Config {
  API_KEY = 'fb35a100cdeccee771a59a11d76de09a',
  BASE_URL  = 'https://api.themoviedb.org/3/',
  IMAGE_URL = 'https://image.tmdb.org/t/p/original/',
  VIDEO_URL = 'https://www.youtube-nocookie.com/embed/'
}


export enum Genres {
  ACTION = 'Action',
  AVENTURE = 'Adventure',
  ANIMATION = 'Animation',
  COMEDY = 'Comedy',
  CRIME = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama'
}

export enum SortBy {
  popularity_asc = 'popularity.asc',
  popularity_desc = 'popularity.desc',
  release_date_asc = 'release_date.asc',
  release_date_desc = 'release_date.desc',
  original_title_asc = 'original_title.asc',
  original_title_desc = 'original_title.desc',
  vote_average_asc = 'vote_average.asc',
  vote_average_desc = 'vote_average.desc',
  vote_count_asc = 'vote_count.asc',
  vote_count_desc = 'vote_count.desc',
  primary_release_date_asc = 'primary_release_date.asc',
  primary_release_date_desc = 'primary_release_date.desc'
}

export enum Language {
  ENGLISH = "en",
  FRENCH = "fr",
  GERMAN = 'ge',
  ITALIAN = 'it',
  SPANISH = "es"
}

export enum Region {
  FRANCE = 'FR',
  GERMANY = 'DE',
  SPAIN = 'ES',
  ITALY = 'IT',
  UNITED_ESTATES = 'US',
  UNITED_KINGDOM = 'GB',
}

export enum MediaType {
  movie = 'movie',
  tv = 'tv',
  all = 'all'
}

export enum TimeWindow {
  day = 'day',
  week = 'week'
}