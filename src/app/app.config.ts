import { isPlatformBrowser } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  PLATFORM_ID,
  inject,
  isDevMode,
  provideEnvironmentInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { NAVIGATION, NAVIGATION_TOKEN } from './core/config/navigation.config';
import { routes } from './app.routes';
import { SeoService } from './core/services/seo.service';
import { AfterFirstPaintPreloadingStrategy } from './core/strategies/after-first-paint-preloading.strategy';
import { SwUpdateService } from './core/services/sw-update.service';
import { globalHttpErrorInterceptor } from './core/http/global-http-error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NAVIGATION_TOKEN, useValue: NAVIGATION },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([globalHttpErrorInterceptor]),
      withInterceptorsFromDi(),
      withFetch(),
    ),
    provideRouter(
      routes,
      withPreloading(AfterFirstPaintPreloadingStrategy),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideEnvironmentInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformId)) {
        inject(SwUpdateService);
      }
      inject(SeoService);
    }),
    provideStore(),
    provideEffects(),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: false,
    }),
  ],
};
