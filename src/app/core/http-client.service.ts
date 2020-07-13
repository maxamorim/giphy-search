import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string, params?: HttpParams, headerParams?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, { params, headers: headerParams || this.getHeaders()}).pipe(share());
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
               .set('Content-Type', 'application/json');
  }
}
