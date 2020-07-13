import { Injectable } from '@angular/core';
import { Giphy } from '../../models/giphy.model';

@Injectable({
  providedIn: 'root'
})
export class GiphyServiceMock {

  constructor() { }

  public async getGiphyImages(query: string, limit: string = '24', offset: string = '0'): Promise<Giphy> {
      const response = {
        data: [],
        pagination: {}
      } as Giphy;

      return new Promise((resolve, reject) => {
        resolve(response);
      });
  }
}
