import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { GeolocationService } from '../application/services/geolocation.service';
import { ScheduleService } from '../application/services/schedule.service';
import { ShareScheduleService } from '../application/services/share-schedule.service';
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
      ScheduleService,
      ShareScheduleService,
      GeolocationService,
    ],
    data: {
      preload: true,
      seo: {
        title: 'Route 6 Schedule | TrollySix',
        description:
          'Check departure times, stops, directions, and live vehicles for trolleybus Route 6 in Dnipro.',
        keywords:
          'Route 6 schedule, Dnipro trolleybus timetable, departure times, live trolleybuses',
        ogImage: 'og-schedule.png',
      },
    },
  },
] satisfies Routes;
