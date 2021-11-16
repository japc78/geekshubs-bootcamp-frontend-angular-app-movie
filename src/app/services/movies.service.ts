import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { MovieResponse, Movie } from '../interfaces/movie';
import { MediaResponse } from '../interfaces/media';
import { Config } from '../classes/Config';
import { Tv } from '../interfaces/tv';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private params = {
    api_key : Config.API_KEY,
    region: 'ES',
    language: 'es-Es'
  }

  constructor(private httpClient: HttpClient) { }

  getLatestTopRatedMovies(): Observable<MovieResponse> {
    const date = new Date();
    // const release_data_lte = new Date(date.getDate() - 15);
    date.setDate(date.getDate()-15);
    const release_data_lte = date.getMonth()
    console.log('date', date)
    console.log('aqui', release_data_lte)

    const url = `${Config.BASE_URL}discover/movie?api_key=${this.params.api_key}&primary_release_date.lte=2021-11-01&region=${this.params.region}&with_release_type=3|4&vote_count.gte=10&sort_by=vote_count.desc&primary_release_date.gte=2021-10-15&include_video=true`
    return this.httpClient.get<MovieResponse>(url)
  }


  getTrending(): Observable<MediaResponse> {
    const url = Config.BASE_URL + "trending/all/week"
    return this.httpClient.get<MediaResponse>(url, { params: this.params});
  }


  getMedia(type: string, id: Number): Observable<Movie | Tv> {
    const url = `${Config.BASE_URL}${type}/${id}`;
    return this.httpClient.get<Movie | Tv>(url, { params: this.params});
  }
}
