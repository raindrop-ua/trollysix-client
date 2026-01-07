import { isPlatformBrowser } from '@angular/common';
import {
  PLATFORM_ID,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';

import { ConfigService } from '../services/config.service';
import { NetworkStatusService } from '../services/network-status.service';
import { PageVisibilityService } from '../services/page-visibility.service';
import { SeoService } from '../services/seo.service';
import { SwUpdateService } from '../services/sw-update.service';

export function provideAppInit(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformId)) {
        inject(SwUpdateService);
        inject(PageVisibilityService).init();
        inject(NetworkStatusService).init();
        inject(ConfigService).init({});
      }
      inject(SeoService);
    }),
  ]);
}
