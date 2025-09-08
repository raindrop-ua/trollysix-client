import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  PLATFORM_ID,
  inject,
  isDevMode,
  provideEnvironmentInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { NAVIGATION, NAVIGATION_TOKEN } from './core/config/navigation.config';
import { SeoService } from './core/services/seo.service';
import { AfterFirstPaintPreloadingStrategy } from './core/strategies/after-first-paint-preloading.strategy';

import { routes } from './app.routes';
import {SwUpdateService} from "./core/services/sw-update.service";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NAVIGATION_TOKEN, useValue: NAVIGATION },
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
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
  ],
};
