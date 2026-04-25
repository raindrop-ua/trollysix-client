import { Routes } from '@angular/router';

import { MetricsListService } from '@features/home/data-access/services/metrics-list.service';
import { TestimonialsListService } from '@features/home/data-access/services/testimonials-list.service';

import { HomeComponent } from './home.component';

export default [
  {
    path: '',
    component: HomeComponent,
    providers: [MetricsListService, TestimonialsListService],
    data: {
      preload: true,
      seo: {
        title: 'Home | TrollySix',
        description:
          'Welcome to ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
