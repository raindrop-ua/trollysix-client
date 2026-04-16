import {
  EnvironmentProviders,
  isDevMode,
  makeEnvironmentProviders,
} from '@angular/core';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export function provideAppState(): EnvironmentProviders {
  const enableDevtools = isDevMode() && typeof window !== 'undefined';

  return makeEnvironmentProviders([
    provideStore(),
    provideEffects(),
    ...(enableDevtools
      ? [
          provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
            connectInZone: false,
          }),
        ]
      : []),
  ]);
}
