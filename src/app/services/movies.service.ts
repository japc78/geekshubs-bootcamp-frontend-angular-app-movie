import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { MovieResponse } from '../interfaces/movie';
import { ImagesResponse } from './../interfaces/image';
import { VideosResponse } from '../interfaces/video';
import { Config } from '../classes/Config';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private params = {
    api_key : Config.API_KEY,
    region: 'ES'
  }

  constructor(private httpClient: HttpClient) { }

  getLatestTopRatedMovies(): Observable<MovieResponse> {
    const url = `${Config.BASE_URL}movie/now_playing`
    return this.httpClient.get<MovieResponse>(url, { params: this.params})
  }
}
