import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  filter,
  take,
} from 'rxjs/operators';
import { of, forkJoin, distinctUntilChanged, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';

import { SchedulePageActions, ScheduleApiActions } from './schedule.actions';
import { scheduleFeature } from './schedule.reducer';
import { ScheduleApiService } from '../data/schedule.api.service';
import { DayType } from '../models/daytype.model';
import { DirectionName } from '../models/direction.model';
import { ActivatedRoute, Router } from '@angular/router';

function parseDirection(v: string | null): DirectionName | null {
  return v === 'forward' || v === 'backward' ? v : null;
}
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
    return findByName('weekend') ?? findByName('weekday') ?? dayTypes[0].name;
  }

  return findByName('weekday') ?? findByName('weekend') ?? dayTypes[0].name;
}

@Injectable()
export class ScheduleEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private scheduleApi = inject(ScheduleApiService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  hydrateFromUrlOnEnter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchedulePageActions.enter),
      switchMap(() =>
        this.route.queryParamMap.pipe(
          take(1),
          map((qp) => {
            const stopId = qp.get('stopId');
            const dayTypeName = qp.get('dayType');
            const directionName = parseDirection(qp.get('direction'));

            return SchedulePageActions.hydrateFromUrl({
              stopId,
              dayTypeName,
              directionName,
            });
          }),
        ),
      ),
    ),
  );

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

  syncStoreToUrl$ = createEffect(
    () =>
      combineLatest([
        this.store.select(scheduleFeature.selectSelectedStopId),
        this.store.select(scheduleFeature.selectSelectedDayTypeName),
        this.store.select(scheduleFeature.selectSelectedDirectionName),
      ]).pipe(
        filter(
          ([stopId, dayTypeName, directionName]) =>
            !!stopId && !!dayTypeName && !!directionName,
        ),
        map(([stopId, dayTypeName, directionName]) => ({
          stopId,
          dayTypeName,
          directionName,
        })),
        distinctUntilChanged(
          (a, b) =>
            a.stopId === b.stopId &&
            a.dayTypeName === b.dayTypeName &&
            a.directionName === b.directionName,
        ),
        switchMap(({ stopId, dayTypeName, directionName }) =>
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              stopId,
              dayType: dayTypeName,
              direction: directionName,
            },
            replaceUrl: true,
          }),
        ),
      ),
    { dispatch: false },
  );

  ensureUrlOnEnter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SchedulePageActions.enter),
        switchMap(() =>
          this.route.queryParamMap.pipe(
            take(1),
            switchMap((qp) => {
              const hasAny =
                qp.has('stopId') || qp.has('dayType') || qp.has('direction');

              if (hasAny) {
                return of(null);
              }

              return combineLatest([
                this.store
                  .select(scheduleFeature.selectSelectedStopId)
                  .pipe(take(1)),
                this.store
                  .select(scheduleFeature.selectSelectedDayTypeName)
                  .pipe(take(1)),
                this.store
                  .select(scheduleFeature.selectSelectedDirectionName)
                  .pipe(take(1)),
              ]).pipe(
                filter(
                  ([stopId, dayTypeName, directionName]) =>
                    !!stopId && !!dayTypeName && !!directionName,
                ),
                switchMap(([stopId, dayTypeName, directionName]) =>
                  this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: {
                      stopId,
                      dayType: dayTypeName,
                      direction: directionName,
                    },
                    replaceUrl: true,
                  }),
                ),
              );
            }),
          ),
        ),
      ),
    { dispatch: false },
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
