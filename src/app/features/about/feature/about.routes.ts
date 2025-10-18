import { Routes } from '@angular/router';
import { AboutComponent } from './about.component';

export default [
  {
    path: '',
    component: AboutComponent,
    data: {
      preload: true,
      animation: 'About',
      seo: {
        title: 'About | TrollySix',
        description: 'Ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
