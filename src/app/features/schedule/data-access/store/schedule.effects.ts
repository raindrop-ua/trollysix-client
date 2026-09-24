import { isPlatformBrowser, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  filter,
  take,
} from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, forkJoin, distinctUntilChanged, tap } from 'rxjs';

import { DayTypeName } from '../models/daytype.model';
import { DirectionName } from '../models/direction.model';
import { ScheduleApiService } from '../services/schedule.api.service';

import { SchedulePageActions, ScheduleApiActions } from './schedule.actions';
import { scheduleFeature } from './schedule.reducer';
import { selectSelectedTime } from './schedule.selectors';
import {
  parseDepartureTime,
  parseDirection,
  resolveAutoDayTypeName,
} from './schedule.utils';

@Injectable()
export class ScheduleEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private scheduleApi = inject(ScheduleApiService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  public hydrateFromUrlOnEnter$ = createEffect(() =>
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
              time: parseDepartureTime(qp.get('time')),
              stopId,
              dayTypeName,
              directionName,
            });
          }),
        ),
      ),
    ),
  );

  public loadInitialData$ = createEffect(() =>
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
                error: toErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  public syncStoreToUrl$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SchedulePageActions.hydrateFromUrl,
          SchedulePageActions.selectStop,
          SchedulePageActions.selectDayType,
          SchedulePageActions.selectDirection,
          SchedulePageActions.toggleTime,
          ScheduleApiActions.loadInitialDataSuccess,
          ScheduleApiActions.loadTimetableSuccess,
        ),
        filter(() => this.isBrowser),
        withLatestFrom(
          this.store.select(scheduleFeature.selectInitialDataLoaded),
          this.store.select(scheduleFeature.selectSelectedStopId),
          this.store.select(scheduleFeature.selectSelectedDayTypeName),
          this.store.select(scheduleFeature.selectSelectedDirectionName),
          this.store.select(selectSelectedTime),
        ),
        filter(
          ([, loaded, stopId, dayType, direction]) =>
            !!loaded && !!stopId && !!dayType && !!direction,
        ),
        tap(([, , stopId, dayType, direction, time]) => {
          const urlTree = this.router.createUrlTree([], {
            relativeTo: this.route,
            queryParams: { stopId, dayType, direction, time },
          });
          this.location.replaceState(this.router.serializeUrl(urlTree));
        }),
      ),
    { dispatch: false },
  );

  public triggerLoadTimetable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SchedulePageActions.hydrateFromUrl,
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
      map(([, stopId, dayType, direction]) => ({
        stopId,
        dayType,
        direction,
      })),
      filter(
        ({ stopId, dayType, direction }) =>
          !!stopId && !!dayType && !!direction,
      ),
      distinctUntilChanged(
        (a, b) =>
          a.stopId === b.stopId &&
          a.dayType === b.dayType &&
          a.direction === b.direction,
      ),
      map(() => ScheduleApiActions.loadTimetable()),
    ),
  );

  public executeLoadTimetable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScheduleApiActions.loadTimetable),
      withLatestFrom(
        this.store.select(scheduleFeature.selectSelectedStopId),
        this.store.select(scheduleFeature.selectSelectedDayTypeName),
        this.store.select(scheduleFeature.selectSelectedDirectionName),
      ),
      filter(
        ([, stopId, dayType, direction]) =>
          !!stopId && !!dayType && !!direction,
      ),
      switchMap(([, stopId, dayType, direction]) =>
        this.scheduleApi.getTimetable(stopId!, dayType!, direction!).pipe(
          map((timetable) =>
            ScheduleApiActions.loadTimetableSuccess({ timetable }),
          ),
          catchError((error) => {
            if (isTimetableNotFound(error)) {
              return of(
                ScheduleApiActions.loadTimetableSuccess({
                  timetable: {
                    id: `${stopId}:${dayType}:${direction}`,
                    name: '',
                    stopId: stopId!,
                    validFrom: '',
                    dayType: dayType! as DayTypeName,
                    direction: direction! as DirectionName,
                    times: [],
                  },
                }),
              );
            }

            return of(
              ScheduleApiActions.loadTimetableFailure({
                error: toErrorMessage(error),
              }),
            );
          }),
        ),
      ),
    ),
  );
}

function isTimetableNotFound(error: unknown): boolean {
  return (
    error instanceof HttpErrorResponse &&
    error.status === 404 &&
    error.url?.includes('/timetables') === true
  );
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string' && error.trim().length > 0) {
    return error;
  }

  return 'Unknown error';
}
