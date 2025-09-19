import { Routes } from '@angular/router';
import { TermsComponent } from './terms.component';
export default [
  {
    path: '',
    component: TermsComponent,
    data: {
      preload: true,
      animation: 'Terms',
      seo: {
        title: 'Terms | TrollySix',
        description:
          'Welcome to ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
