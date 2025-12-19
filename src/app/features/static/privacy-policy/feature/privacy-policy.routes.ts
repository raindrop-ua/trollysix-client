import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy.component';

export default [
  {
    path: '',
    component: PrivacyPolicyComponent,
    data: {
      preload: true,
      seo: {
        title: 'Privacy Policy | TrollySix',
        description:
          'Welcome to ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
