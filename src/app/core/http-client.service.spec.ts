import { TestBed } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';import { Giphy } from '../models/giphy.model';
;

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HttpClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Giphy>', () => {
    const expectedGiphys: Giphy =
      {
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

    service.get<Giphy>('testUrl').subscribe(giphys => {
      expect(giphys).toEqual(expectedGiphys);
    });

    const req = httpMock.expectOne('testUrl');
    expect(req.request.method).toBe('GET');
    req.flush(expectedGiphys);
  });
});
