import { Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
export default [
  {
    path: '',
    component: ScheduleComponent,
    data: {
      preload: true,
      animation: 'Schedule',
      seo: {
        title: 'Schedule | TrollySix',
        description: 'Ultimate schedule for trolleybus route 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
