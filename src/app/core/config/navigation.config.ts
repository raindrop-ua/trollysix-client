import { InjectionToken } from '@angular/core';

import { COPY } from '@core/content/en';
import { AppRouteEnum } from '@core/enums/app-route.enum';

export interface NavItem {
  path: string;
  label: string;
}

export const NAVIGATION: NavItem[] = [
  { path: AppRouteEnum.Home, label: COPY.common.navigation.home },
  { path: AppRouteEnum.Schedule, label: COPY.common.navigation.schedule },
  { path: AppRouteEnum.About, label: COPY.common.navigation.about },
];

export const NAVIGATION_TOKEN = new InjectionToken<NavItem[]>('NAVIGATION');
