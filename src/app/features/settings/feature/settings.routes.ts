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
        description: 'Manage your TrollySix app settings and preferences.',
        keywords: 'TrollySix settings, app preferences',
        ogImage: 'og-default.png',
      },
    },
  },
] satisfies Routes;
