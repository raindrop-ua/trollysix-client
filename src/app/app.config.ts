import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { provideAppCore } from './core/config/app-core.providers';
import { provideAppHttp } from './core/config/app-http.providers';
import { provideAppRouter } from './core/config/app-router.providers';
import { provideAppPwa } from './core/config/app-pwa.providers';
import { provideAppState } from './core/config/app-state.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppCore(),
    provideAppHttp(),
    provideAppRouter(routes),
    provideAppPwa(),
    provideAppState(),
  ],
};
