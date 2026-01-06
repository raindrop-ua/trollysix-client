import { Routes } from '@angular/router';

import { TermsOfUseComponent } from './terms-of-use.component';

export default [
  {
    path: '',
    component: TermsOfUseComponent,
    data: {
      preload: true,
      seo: {
        title: 'Terms of Use | TrollySix',
        description:
          'Welcome to ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
