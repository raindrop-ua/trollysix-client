import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  filter,
} from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';

import { SchedulePageActions, ScheduleApiActions } from './schedule.actions';
import { scheduleFeature } from './schedule.reducer';
import { ScheduleApiService } from '../data/schedule.api.service';

@Injectable()
export class ScheduleEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private scheduleApi = inject(ScheduleApiService);

  loadInitialData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchedulePageActions.enter),
      switchMap(() =>
        forkJoin({
          stops: this.scheduleApi.getStops(),
          dayTypes: this.scheduleApi.getDayTypes(),
          directions: this.scheduleApi.getDirections(),
        }).pipe(
          map(({ stops, dayTypes, directions }) =>
            ScheduleApiActions.loadInitialDataSuccess({
              stops,
              dayTypes,
              directions,
            }),
          ),
          catchError((error) =>
            of(
              ScheduleApiActions.loadInitialDataFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  triggerLoadTimetable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SchedulePageActions.selectStop,
        SchedulePageActions.selectDayType,
        SchedulePageActions.selectDirection,
        ScheduleApiActions.loadInitialDataSuccess,
      ),
      withLatestFrom(
        this.store.select(scheduleFeature.selectSelectedStopId),
        this.store.select(scheduleFeature.selectSelectedDayTypeName),
        this.store.select(scheduleFeature.selectSelectedDirectionName),
      ),
      filter(
        ([action, stopId, dayType, direction]) =>
          !!stopId && !!dayType && !!direction,
      ),
      map(() => ScheduleApiActions.loadTimetable()),
    ),
  );

  executeLoadTimetable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScheduleApiActions.loadTimetable),
      withLatestFrom(
        this.store.select(scheduleFeature.selectSelectedStopId),
        this.store.select(scheduleFeature.selectSelectedDayTypeName),
        this.store.select(scheduleFeature.selectSelectedDirectionName),
      ),
      switchMap(([action, stopId, dayType, direction]) =>
        this.scheduleApi.getTimetable(stopId!, dayType!, direction!).pipe(
          map((timetable) =>
            ScheduleApiActions.loadTimetableSuccess({ timetable }),
          ),
          catchError((error) =>
            of(
              ScheduleApiActions.loadTimetableFailure({ error: error.message }),
            ),
          ),
        ),
      ),
    ),
  );
}
