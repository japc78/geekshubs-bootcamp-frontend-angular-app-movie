import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { MovieResponse, Movie } from '../interfaces/movie';
import { MediaResponse } from '../interfaces/media';
import { Config } from '../classes/Config';
import { Tv } from '../interfaces/tv';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Credits } from '../interfaces/credits';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // private params = {
  //   api_key : Config.API_KEY,
  //   language: "es-ES",
  //   region: "ES",
  // }

  // private params: HttpParams;
  private opts = { params: new HttpParams({
    fromString: `api_key=${Config.API_KEY}&language=es-ES&region: "ES"`
  })};;

  constructor(private httpClient: HttpClient) {

    // FIXME Query params no funciona correctamente
    // Al pasar lo parametros  como Objeto.
    // this.params = new HttpParams({
    //   fromObject: {
    //       api_key : Config.API_KEY,
    //       language: "es-ES",
    //       region: "ES",
    //     }
    // });

    // this.params.append('api_key', Config.API_KEY);
    // this.params.append('language', 'es-ES')
    // this.params.append('region', 'ES')
   }

  getLatestTopRatedMovies(): Observable<MovieResponse> {
    const date = new Date();
    // const release_data_lte = new Date(date.getDate() - 15);
    date.setDate(date.getDate()-15);
    const release_data_lte = date.getMonth()
    console.log('date', date)
    console.log('aqui', release_data_lte)

    const url = `${Config.BASE_URL}discover/movie?primary_release_date.lte=2021-11-01&with_release_type=3|4&vote_count.gte=10&sort_by=vote_count.desc&primary_release_date.gte=2021-10-15&include_video=true`
    return this.httpClient.get<MovieResponse>(url, this.opts)
  }


  getTrending(): Observable<MediaResponse> {
    const url = Config.BASE_URL + "trending/all/week"
    return this.httpClient.get<MediaResponse>(url, this.opts);
  }


  getMedia(type: string, id: Number): Observable<Movie & Tv> {
    const url = `${Config.BASE_URL}${type}/${id}`;
    return this.httpClient.get<Movie & Tv>(url, this.opts);
  }

  getCredits(type: string, id: number): Observable<Credits> {
    const url = `${Config.BASE_URL}${type}/${id}/credits`;
    return this.httpClient.get<Credits>(url, this.opts);
  }

  getSimilar(type: string, id: number): Observable<MediaResponse> {
    const url = `${Config.BASE_URL}${type}/${id}/similar`;
    return this.httpClient.get<MediaResponse>(url, this.opts)
  }
}
