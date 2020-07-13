import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Giphy } from 'src/app/models/giphy.model';

@Injectable({
  providedIn: 'root'
})
export class HttpClientServiceMock {

  constructor() { }

  public get<T>(url: string, params?: HttpParams, headerParams?: HttpHeaders): Observable<T> {
    const expectedGiphys: Giphy = {
        data: [{
          images: {
            fixed_height: {},
            original: {}
          }
        },
        {
          images: {
            fixed_height: {},
            original: {}
          }
        }],
        pagination: {
          count: 10,
          offset: 1,
          total_count: 100
        }
      };
    return of(expectedGiphys as unknown as T);
  }
}
