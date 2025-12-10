import { IMAGE_CONFIG, isPlatformBrowser } from '@angular/common';
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
  provideAppInitializer,
  ErrorHandler,
} from '@angular/core';
import {
  EVENT_MANAGER_PLUGINS,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
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
import { SwUpdateService } from './core/services/sw-update.service';
import { SeoService } from './core/services/seo.service';
import { PageVisibilityService } from './core/services/page-visibility.service';
import { AfterFirstPaintPreloadingStrategy } from './core/strategies/after-first-paint-preloading.strategy';
import { globalHttpErrorInterceptor } from './core/interceptors/global-http-error.interceptor';
import { CustomErrorHandler } from './core/custom-error-handler';
import { PreventDefaultEventPlugin } from './core/plugins/prevent-default-events';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NAVIGATION_TOKEN, useValue: NAVIGATION },
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    {
      provide: EVENT_MANAGER_PLUGINS,
      multi: true,
      useClass: PreventDefaultEventPlugin,
    },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40,
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
      },
    },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([globalHttpErrorInterceptor]),
      withInterceptorsFromDi(),
      withFetch(),
    ),
    provideRouter(
      routes,
      withComponentInputBinding(),
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
    provideAppInitializer(() => {
      const svc = inject(PageVisibilityService);
      svc.init();
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
