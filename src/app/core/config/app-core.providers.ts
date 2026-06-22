import { IMAGE_CONFIG } from '@angular/common';
import {
  EnvironmentProviders,
  ErrorHandler,
  makeEnvironmentProviders,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { CustomErrorHandler } from '@core/handlers/custom-error.handler';
import { PreventDefaultEventPlugin } from '@core/plugins/prevent-default-events';

import { NAVIGATION, NAVIGATION_TOKEN } from './navigation.config';

export function provideAppCore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NAVIGATION_TOKEN, useValue: NAVIGATION },
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    {
      provide: EVENT_MANAGER_PLUGINS,
      multi: true,
      useClass: PreventDefaultEventPlugin,
    },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40,
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
      },
    },
    provideBrowserGlobalErrorListeners(),
  ]);
}
