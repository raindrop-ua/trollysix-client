import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { globalHttpErrorInterceptor } from '../interceptors/global-http-error.interceptor';

export function provideAppHttp(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(
      withInterceptors([globalHttpErrorInterceptor]),
      withInterceptorsFromDi(),
      withFetch(),
    ),
  ]);
}
