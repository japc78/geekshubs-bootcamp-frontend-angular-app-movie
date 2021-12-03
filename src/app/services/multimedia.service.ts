import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImagesResponse } from '../interfaces/image';
import { VideosResponse } from '../interfaces/video';
import { Config } from '../classes/Config';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  private params = {
    api_key : Config.API_KEY,
    region: 'ES'
  }

  constructor(private httpClient: HttpClient) { }

  getImages(id: Number, type: String): Observable<ImagesResponse> {
    const url = `${Config.BASE_URL}${type}/${id}/images`;
    return this.httpClient.get<ImagesResponse>(url, { params: this.params});
  }

  getVideos(id: Number, type: String): Observable<VideosResponse> {
    const url = `${Config.BASE_URL}${type}/${id}/videos`
    return this.httpClient.get<VideosResponse>(url, { params: this.params });
  }
}
