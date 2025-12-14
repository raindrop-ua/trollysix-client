import {
  EnvironmentProviders,
  ErrorHandler,
  makeEnvironmentProviders,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { IMAGE_CONFIG } from '@angular/common';
import { NAVIGATION, NAVIGATION_TOKEN } from './navigation.config';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { CustomErrorHandler } from '../custom-error-handler';
import { PreventDefaultEventPlugin } from '../plugins/prevent-default-events';

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
