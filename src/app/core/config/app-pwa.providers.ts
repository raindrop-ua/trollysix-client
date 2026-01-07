import {
  EnvironmentProviders,
  isDevMode,
  makeEnvironmentProviders,
} from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

export function provideAppPwa(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ]);
}
