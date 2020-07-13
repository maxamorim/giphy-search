import { IAppConfig } from '../../models/app-config.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigMock {
    settings: IAppConfig;
    constructor() {}

    loadConfig(): Promise<any> {
        const settings: IAppConfig = {
            giphy: {
                baseUrl: 'testBaseUrl',
                gifSearchEndpoint: 'testgifSearchEndpoint',
                rating: 'testrating',
                apiKey: 'testapiKey'
            }
        };
        this.settings = settings;

        return Promise.resolve(settings);
    }
}
