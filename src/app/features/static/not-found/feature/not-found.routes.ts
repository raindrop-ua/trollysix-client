import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

export default [
  {
    path: '',
    component: NotFoundComponent,
    data: {
      preload: true,
      seo: {
        title: '404 | TrollySix',
        description:
          'Welcome to ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
