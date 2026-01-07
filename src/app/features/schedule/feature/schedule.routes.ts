import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { ScheduleEffects } from '../data-access/store/schedule.effects';
import { scheduleFeature } from '../data-access/store/schedule.reducer';

import { ScheduleComponent } from './schedule.component';

export default [
  {
    path: '',
    component: ScheduleComponent,
    providers: [
      provideState(scheduleFeature),
      provideEffects([ScheduleEffects]),
    ],
    data: {
      preload: true,
      seo: {
        title: 'Schedule | TrollySix',
        description: 'Ultimate schedule for trolleybus route 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
