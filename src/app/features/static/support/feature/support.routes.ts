import { Routes } from '@angular/router';

import { SupportComponent } from './support.component';

export default [
  {
    path: '',
    component: SupportComponent,
    data: {
      preload: true,
      seo: {
        title: 'Support | TrollySix',
        description:
          'Contact TrollySix support about app issues, feedback, or feature requests.',
        keywords: 'TrollySix support, app feedback, feature requests, contact',
        ogImage: 'og-default.png',
      },
    },
  },
] satisfies Routes;
