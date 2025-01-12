import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpBackend } from '@angular/common/http';

//Move this type to a shared folder
export interface AppConfig {
  Environment: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  //Default, if config files missing
  private configuration: AppConfig = {
    Environment: 'DEV',
  };

  private http: HttpClient;
  constructor() {
    this.http = inject(HttpClient)
  }

  //This function will get the current config for the environment
  setConfig(): Promise<void | AppConfig> {
    return firstValueFrom(this.http.get<AppConfig>('./app-config.json'))
      .then((config: AppConfig) => (this.configuration = config))
      .catch(error => {
        console.error(error);
      });
  }

  //We're going to use this function to read the config.
  readConfig(): AppConfig {
    return this.configuration;
  }
}