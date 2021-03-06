import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { MediaResponse, Media } from '../interfaces/media';
import { Config, Language, Region, SortBy } from '../classes/Config';
import { Tv } from '../interfaces/tv';
import { Credits } from '../interfaces/credits';
import { MediaType, TimeWindow } from '../classes/Config';
import { IQuery, QueryMovie, QueryTv } from '../interfaces/Query';
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

  private movieQuery: QueryMovie = {
    "primary_release_date.lte": new Date().toISOString().split('T')[0]
  }

  private paramsMovie = new HttpParams({
    fromObject: { ...Object(this.movieQuery)}
  })

  private tvQuery: QueryTv = {
    "first_air_date.lte": new Date().toISOString().split('T')[0]
  }

  private paramsTv = new HttpParams({
    fromObject: { ...Object(this.tvQuery)}
  })

  constructor(private httpClient: HttpClient) { }

  private getParams(mediaType?: MediaType): HttpParams {
    switch (mediaType) {
      case MediaType.movie:
        return new HttpParams({ fromObject: {...this.commonQuery, ...this.movieQuery }})
      case MediaType.tv:
        return new HttpParams({ fromObject: {...this.commonQuery, ...this.tvQuery }})
      default:
        return new HttpParams({ fromObject: {...this.commonQuery }})
    }
  }


  getTrending(mediaType: MediaType, timeWindow: TimeWindow): Observable<MediaResponse> {
    const url = `${Config.BASE_URL}trending/${mediaType}/${timeWindow}`
    return this.httpClient.get<MediaResponse>(url,  { params: this.getParams(mediaType)});
  }


  getMedia(mediaType: MediaType, id: Number): Observable<Movie & Tv> {

    const url = `${Config.BASE_URL}${mediaType}/${id}`;
    return this.httpClient.get<Movie & Tv>(url,  { params: this.getParams(mediaType)});
  }


  getCredits(mediaType: MediaType, id: number): Observable<Credits> {
    const url = `${Config.BASE_URL}${mediaType}/${id}/credits`;
    return this.httpClient.get<Credits>(url,  { params: this.getParams(mediaType)});
  }


  getSimilar(mediaType: MediaType, id: number): Observable<MediaResponse> {
    const url = `${Config.BASE_URL}${mediaType}/${id}/similar`;
    return this.httpClient.get<MediaResponse>(url, { params: this.getParams(mediaType)})
  }


  findMedia(query: string): Observable<MediaResponse> {
    const url = `${Config.BASE_URL}search/multi?query=${query}`
    return this.httpClient.get<MediaResponse>(url, { params: this.getParams()} );
  }


  getCatalogue(mediaType: MediaType, filters?: IQuery): Observable<Media[]> {
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


  getLatest(): Observable<Media[]> {
    const dateFrom = new Date();
    const dateTo = new Date(new Date().setDate(dateFrom.getDate() + 7));

    this.movieQuery = {
      "primary_release_date.gte": dateFrom.toISOString().split('T')[0],
      "primary_release_date.lte": dateTo.toISOString().split('T')[0],
      sort_by: SortBy.popularity_desc
    }

    this.tvQuery = {
      "first_air_date.gte": dateFrom.toISOString().split('T')[0],
      "first_air_date.lte": dateTo.toISOString().split('T')[0],
      sort_by: SortBy.popularity_desc
    }

    let items: Media[] = []
    return forkJoin([
      this.httpClient.get<MediaResponse>(`${Config.BASE_URL}discover/movie`, { params: this.getParams(MediaType.movie) }),
      this.httpClient.get<MediaResponse>(`${Config.BASE_URL}discover/tv`, { params: this.getParams(MediaType.tv) })
    ]).pipe(
      map(resp => {
        items.push(...resp[0].results.filter(item => item.poster_path  && item.backdrop_path).map(item => item = {...item, media_type: MediaType.movie}))
        items.push(...resp[1].results.filter(item => item.poster_path  && item.backdrop_path).map(item => item = {...item, media_type: MediaType.tv}))
        return items.sort((a,b) => a.popularity < b.popularity && 1 || -1 )
      })
    )
  }


  getGenres(mediaType: MediaType): Observable<Genre[]> {
    const url = `${Config.BASE_URL}genre/${mediaType}/list`
    return this.httpClient.get<GenreResponse>(url, { params: this.getParams(mediaType)})
      .pipe(map(resp => resp.genres));
  }
}