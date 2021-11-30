import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { MediaResponse, Media } from '../interfaces/media';
import { Config, Language, Region, SortBy } from '../classes/Config';
import { Tv } from '../interfaces/tv';
import { Credits } from '../interfaces/credits';
import { MediaType, TimeWindow } from '../classes/Config';
import { IQuery } from '../interfaces/Query';
import { Movie } from '../interfaces/movie';
import { Genre, GenreResponse } from '../interfaces/Genre';
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private commonQuery: IQuery = {
    api_key: Config.API_KEY,
    language: Language.SPANISH + '-' + Region.SPAIN,
    certification_country: Region.SPAIN,
    certification: 'R'
  }



  private params = new HttpParams({
    fromObject: { ...Object(this.commonQuery)}
  })

  constructor(private httpClient: HttpClient) { }

  getTrending(mediaType: MediaType, timeWindow: TimeWindow): Observable<MediaResponse> {
    const url = `${Config.BASE_URL}trending/${mediaType}/${timeWindow}`
    console.log(url);

    return this.httpClient.get<MediaResponse>(url,  { params: this.params});
  }


  getMedia(type: string, id: Number): Observable<Movie & Tv> {
    const url = `${Config.BASE_URL}${type}/${id}`;
    return this.httpClient.get<Movie & Tv>(url,  { params: this.params});
  }


  getCredits(type: string, id: number): Observable<Credits> {
    const url = `${Config.BASE_URL}${type}/${id}/credits`;
    return this.httpClient.get<Credits>(url,  { params: this.params});
  }


  getSimilar(type: string, id: number): Observable<MediaResponse> {
    const url = `${Config.BASE_URL}${type}/${id}/similar`;
    return this.httpClient.get<MediaResponse>(url, { params: this.params})
  }


  findMedia(query: string): Observable<MediaResponse> {
    const url = `${Config.BASE_URL}search/multi?query=${query}`
    return this.httpClient.get<MediaResponse>(url, { params: this.params} );
  }


  getCatalogue(mediaType: MediaType, filters?: IQuery): Observable<Media[]> {

    // if (this.loading) return of([])

    // this.loading = true;
    const query: IQuery = {
      ...this.commonQuery,
      ...filters,
    };

    let params = new HttpParams({
      fromObject: { ...Object(query) }
    });

    const url = `${Config.BASE_URL}discover/${mediaType}`
    return this.httpClient.get<MediaResponse>(url, { params })
      .pipe(
        map( resp => resp.results.filter(item => item.poster_path  && item.backdrop_path)),
      );
  }


  getGenres(mediaType: MediaType): Observable<Genre[]> {
    const url = `${Config.BASE_URL}genre/${mediaType}/list`
    return this.httpClient.get<GenreResponse>(url, {params: this.params})
      .pipe(map(resp => resp.genres));
  }
}