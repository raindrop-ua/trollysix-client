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
        title: 'TrollySix | Dnipro Trolleybus Route 6',
        description:
          'Check the timetable and practical route information for trolleybus Route 6 in Dnipro.',
        keywords:
          'Dnipro trolleybus, trolleybus Route 6, Route 6 timetable, TrollySix',
        ogImage: 'og-default.png',
      },
    },
  },
] satisfies Routes;
