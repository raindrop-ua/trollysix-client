import {
  PreloadingStrategy,
  Routes,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  Type,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AfterFirstPaintPreloadingStrategy } from '../strategies/after-first-paint-preloading.strategy';

export function provideAppRouter<T extends Routes>(
  routes: T,
  preloading: Type<PreloadingStrategy> = AfterFirstPaintPreloadingStrategy,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(preloading),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),
  ]);
}
