import { Routes } from '@angular/router';
import { PrivacyComponent } from './privacy.component';
export default [
  {
    path: '',
    component: PrivacyComponent,
    data: {
      preload: true,
      animation: 'Privacy',
      seo: {
        title: 'Privacy | TrollySix',
        description:
          'Welcome to ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
