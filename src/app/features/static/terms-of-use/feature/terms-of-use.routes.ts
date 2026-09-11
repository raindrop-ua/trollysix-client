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
          'Read the terms for using TrollySix timetable information, including accuracy, permitted use, and limitations of liability.',
        keywords: 'TrollySix terms of use, timetable information, legal terms',
        ogImage: 'og-default.png',
      },
    },
  },
] satisfies Routes;
