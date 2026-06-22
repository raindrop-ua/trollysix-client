import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { apiActivityInterceptor } from '@core/interceptors/api-activity.interceptor';
import { globalHttpErrorInterceptor } from '@core/interceptors/global-http-error.interceptor';

export function provideAppHttp(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(
      withInterceptors([apiActivityInterceptor, globalHttpErrorInterceptor]),
    ),
  ]);
}
