import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { globalHttpErrorInterceptor } from '@core/interceptors/global-http-error.interceptor';

export function provideAppHttp(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(
      withInterceptors([globalHttpErrorInterceptor]),
      withFetch(),
    ),
  ]);
}
