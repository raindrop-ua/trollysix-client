import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export default [
  {
    path: '',
    component: HomeComponent,
    data: {
      preload: true,
      seo: {
        title: 'Home | TrollySix',
        description:
          'Welcome to ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
