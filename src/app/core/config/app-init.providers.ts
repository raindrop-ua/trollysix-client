import {
  PLATFORM_ID,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdateService } from '../services/sw-update.service';
import { PageVisibilityService } from '../services/page-visibility.service';
import { SeoService } from '../services/seo.service';
import { ConfigService } from '../services/config.service';

export function provideAppInit(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformId)) {
        inject(SwUpdateService);
        inject(PageVisibilityService).init();
        inject(ConfigService).init({});
      }
      inject(SeoService);
    }),
  ]);
}
