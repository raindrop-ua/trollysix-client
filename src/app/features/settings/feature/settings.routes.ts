import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

export default [
  {
    path: '',
    component: SettingsComponent,
    data: {
      preload: true,
      seo: {
        title: 'Settings | TrollySix',
        description:
          'Welcome to ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
