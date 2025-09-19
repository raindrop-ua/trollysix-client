import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ScheduleComponent } from './schedule.component';
import { scheduleFeature } from '../data-access/store/schedule.reducer';
import { ScheduleEffects } from '../data-access/store/schedule.effects';

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
      animation: 'Schedule',
      seo: {
        title: 'Schedule | TrollySix',
        description: 'Ultimate schedule for trolleybus route 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
  },
] satisfies Routes;
