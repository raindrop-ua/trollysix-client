import { ApplicationConfig } from '@angular/core';

import { provideAppCore } from '@config/app-core.providers';
import { provideAppHttp } from '@config/app-http.providers';
import { provideAppInit } from '@config/app-init.providers';
import { provideAppPwa } from '@config/app-pwa.providers';
import { provideAppRouter } from '@config/app-router.providers';
import { provideAppState } from '@config/app-state.providers';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppCore(),
    provideAppHttp(),
    provideAppRouter(routes),
    provideAppPwa(),
    provideAppState(),
    provideAppInit(),
  ],
};
