import { TestBed } from '@angular/core/testing';

import { GiphyService } from './giphy.service';
import { HttpClientService } from './http-client.service';
import { Giphy } from '../models/giphy.model';
import { of } from 'rxjs';
import { AppConfig } from './config/app-config.service';
import { AppConfigMock } from '../test/mocks/app-config.service.mock';
import { APP_INITIALIZER, ApplicationInitStatus } from '@angular/core';

export function initializeConfig(appConfig: AppConfig): () => Promise<any> {
  return () => appConfig.loadConfig();
}

describe('GiphyService', () => {
  let service: GiphyService;
  let httpClientSpy: jasmine.SpyObj<HttpClientService>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClientService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initializeConfig,
          deps: [AppConfig],
          multi: true
        },
        { provide: HttpClientService, useValue: httpSpy },
        { provide: AppConfig, useClass: AppConfigMock }
      ]
    });
  });

  beforeEach(async () => {
    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  beforeEach(() => {
    service = TestBed.inject(GiphyService);
    httpClientSpy = TestBed.inject(HttpClientService) as jasmine.SpyObj<HttpClientService>;
  });

  it('should return expected giphys (HttpClient called once)', (done) => {
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

    httpClientSpy.get.and.returnValue(of(expectedGiphys));

    service.getGiphyImages('test').then(
      giphys => {
        expect(giphys).toEqual(expectedGiphys, 'expected giphys');
        done();
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return exception', (done) => {
    service.getGiphyImages('test').then(
      giphys => {
        return;
      },
      exception => {
        expect(exception).toBeTruthy();
        done();
      }
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
