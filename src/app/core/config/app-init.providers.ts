import { isPlatformBrowser } from '@angular/common';
import {
  PLATFORM_ID,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';

import { ConfigService } from '@core/services/config.service';
import { NetworkStatusService } from '@core/services/network-status.service';
import { PageVisibilityService } from '@core/services/page-visibility.service';
import { SeoService } from '@core/services/seo.service';
import { SwUpdateService } from '@core/services/sw-update.service';

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
