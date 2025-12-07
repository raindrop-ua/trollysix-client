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
import { DayType } from '../models/daytype.model';

function resolveAutoDayTypeName(
  dayTypes: DayType[],
  today: Date = new Date(),
): string | null {
  if (!dayTypes?.length) {
    return null;
  }

  const dayOfWeek = today.getDay(); // 0 - Sunday, 6 - Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const findByName = (name: string) =>
    dayTypes.find((dt) => dt.name === name)?.name ?? null;

  if (isWeekend) {
    return (
      findByName('weekend') ?? findByName('weekday') ?? dayTypes[0].name
    );
  }

  return findByName('weekday') ?? findByName('weekend') ?? dayTypes[0].name;
}

@Injectable()
export class ScheduleEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private scheduleApi = inject(ScheduleApiService);

  loadInitialData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchedulePageActions.enter),
      withLatestFrom(
        this.store.select(scheduleFeature.selectInitialDataLoaded),
      ),
      filter(([, initialDataLoaded]) => !initialDataLoaded),
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
              autoSelectedDayTypeName: resolveAutoDayTypeName(dayTypes),
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
        ([, stopId, dayType, direction]) =>
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
      switchMap(([, stopId, dayType, direction]) =>
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
