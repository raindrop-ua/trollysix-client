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
        title: 'About Dnipro Trolleybus Route 6 | TrollySix',
        description:
          'Explore the history, route, stops, and vehicles of trolleybus Route 6 connecting Pridniprovsk with central Dnipro.',
        keywords:
          'Dnipro trolleybus Route 6, Route 6 history, Route 6 stops, AKSM 321D',
        ogImage: 'og-default.png',
      },
    },
  },
] satisfies Routes;
