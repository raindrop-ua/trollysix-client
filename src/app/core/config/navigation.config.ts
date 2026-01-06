import { InjectionToken } from '@angular/core';

import { AppRouteEnum } from '@core/enums/app-route.enum';

export interface NavItem {
  path: string;
  label: string;
}

export const NAVIGATION: NavItem[] = [
  { path: AppRouteEnum.Home, label: 'Home' },
  { path: AppRouteEnum.Schedule, label: 'Schedule' },
  { path: AppRouteEnum.About, label: 'About' },
];

export const NAVIGATION_TOKEN = new InjectionToken<NavItem[]>('NAVIGATION');
