import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ImagesResponse, MovieResponse } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  getLatestTopRatedMovies(): Observable<MovieResponse> {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb35a100cdeccee771a59a11d76de09a&region=ES'
   return this.httpClient.get<MovieResponse>(url)
  }

  getMovieImages(id: Number): Observable<ImagesResponse> {
    const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=fb35a100cdeccee771a59a11d76de09a`;
    return this.httpClient.get<ImagesResponse>(url);
  }
}
