import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

export default [
  {
    path: '',
    component: NotFoundComponent,
    data: {
      preload: true,
      seo: {
        title: 'Page Not Found | TrollySix',
        description:
          'The requested TrollySix page could not be found. Return home or open the Route 6 schedule.',
        keywords: 'TrollySix page not found, 404',
        ogImage: 'og-default.png',
      },
    },
  },
] satisfies Routes;
