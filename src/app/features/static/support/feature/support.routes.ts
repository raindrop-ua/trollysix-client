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
        description: 'Get support for TrollySix.',
        keywords: 'trollysix, support, contact',
      },
    },
  },
] satisfies Routes;
