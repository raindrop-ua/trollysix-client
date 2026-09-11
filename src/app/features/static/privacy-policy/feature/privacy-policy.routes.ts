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
          'Learn how TrollySix handles privacy, personal data, and locally stored preferences across its website and mobile apps.',
        keywords: 'TrollySix privacy policy, personal data, local preferences',
        ogImage: 'og-default.png',
      },
    },
  },
] satisfies Routes;
