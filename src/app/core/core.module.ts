import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig } from './config/app-config.service';
import { HttpClientService } from './http-client.service';
import { GiphyService } from './giphy.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './http-interceptors/error-handler.interceptor';

export function initializeConfig(appConfig: AppConfig): () => Promise<any> {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      deps: [AppConfig],
      multi: true
    },
    AppConfig,
    HttpClientService,
    GiphyService
  ]
})
export class CoreModule { }
