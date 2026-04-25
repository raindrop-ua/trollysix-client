import { Routes } from '@angular/router';

import { StopsListService } from '@features/about/data-access/services/stops-list.service';

import { AboutComponent } from './about.component';

export default [
  {
    path: '',
    component: AboutComponent,
    providers: [StopsListService],
    data: {
      preload: true,
      seo: {
        title: 'About | TrollySix',
        description: 'Ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
