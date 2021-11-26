import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { MovieResponse, Movie } from '../interfaces/movie';
import { MediaResponse } from '../interfaces/media';
import { Config, Language, Region } from '../classes/Config';
import { Tv } from '../interfaces/tv';
import { Credits } from '../interfaces/credits';
import { MediaType, TimeWindow } from '../classes/Config';
import { QueryMovie, IQuery } from '../interfaces/Query';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private commonQuery: IQuery = {
    api_key: Config.API_KEY,
    language: Language.SPANISH,
  }

  private cataloguePage = 1;

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


  getCatalogue(mediaType: MediaType, filters: IQuery): Observable<MediaResponse> {
    const query: IQuery = {
      ...this.commonQuery,
      ...filters,
      page: this.cataloguePage
    };

    let params = new HttpParams({
      fromObject: { ...Object(query) }
    });

    const url = `${Config.BASE_URL}discover/${mediaType}`
    return this.httpClient.get<MediaResponse>(url, { params })
      .pipe(tap(()=> {this.cataloguePage += 1})) ;
  }
}