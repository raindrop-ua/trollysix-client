import {
  EnvironmentProviders,
  ErrorHandler,
  inject,
  makeEnvironmentProviders,
  PLATFORM_ID,
  provideBrowserGlobalErrorListeners,
  provideEnvironmentInitializer,
} from '@angular/core';
import { IMAGE_CONFIG, isPlatformBrowser } from '@angular/common';
import { NAVIGATION, NAVIGATION_TOKEN } from './navigation.config';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { CustomErrorHandler } from '../custom-error-handler';
import { PreventDefaultEventPlugin } from '../plugins/prevent-default-events';
import { SwUpdateService } from '../services/sw-update.service';
import { PageVisibilityService } from '../services/page-visibility.service';
import { SeoService } from '../services/seo.service';

export function provideAppCore(): EnvironmentProviders {
  return makeEnvironmentProviders([
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
    provideEnvironmentInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformId)) {
        inject(SwUpdateService);
        inject(PageVisibilityService).init();
      }
      inject(SeoService);
    }),
  ]);
}
