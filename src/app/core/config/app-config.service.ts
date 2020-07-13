import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../../models/app-config.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class AppConfig {
    settings: IAppConfig;
    constructor(private readonly http: HttpClient) {}

    loadConfig(): Promise<any> {
        return this.http.get<IAppConfig>('/assets/config/config.json')
            .pipe(map(
                (data) => this.settings = data
            )).toPromise().catch((reason) => {
                console.log(reason);
            });
    }
}
