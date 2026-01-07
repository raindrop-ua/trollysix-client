import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  Type,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  PreloadingStrategy,
  Routes,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { AfterFirstPaintPreloadingStrategy } from '../strategies/after-first-paint-preloading.strategy';

export function provideAppRouter<T extends Routes>(
  routes: T,
  preloading: Type<PreloadingStrategy> = AfterFirstPaintPreloadingStrategy,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withPreloading(preloading),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),
  ]);
}
