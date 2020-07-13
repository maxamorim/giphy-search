import { Injectable } from '@angular/core';
import { AppConfig } from './config/app-config.service';
import { HttpClientService } from './http-client.service';
import { HttpParams } from '@angular/common/http';
import { Giphy } from '../models/giphy.model';
import { IAppConfig } from '../models/app-config.model';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  appSettings: IAppConfig;

  constructor(private http: HttpClientService, private appConfig: AppConfig) { }

  public async getGiphyImages(query: string, limit: string = '24', offset: string = '0'): Promise<Giphy> {
    const url = this.getUrl();
    const params = new HttpParams()
    .set('api_key', this.appConfig.settings.giphy.apiKey)
    .set('q', query)
    .set('limit', limit)
    .set('offset', offset)
    .set('rating', this.appConfig.settings.giphy.rating);
    return await this.http.get<Giphy>(url, params).toPromise();
  }

  private getUrl(): string {
    const baseUrl = this.appConfig.settings.giphy.baseUrl;
    const endpoint = this.appConfig.settings.giphy.gifSearchEndpoint;
    return `${baseUrl}${endpoint}`;
  }
}
