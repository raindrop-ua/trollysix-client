import { Location } from '@angular/common';
import { Injector, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, Subject, firstValueFrom, of, throwError } from 'rxjs';

import { DayType } from '../models/daytype.model';
import { Direction, DirectionName } from '../models/direction.model';
import { Stop } from '../models/stop.model';
import { Timetable } from '../models/timetable.model';
import { ScheduleApiService } from '../services/schedule.api.service';

import { ScheduleApiActions, SchedulePageActions } from './schedule.actions';
import { ScheduleEffects } from './schedule.effects';
import { scheduleFeature } from './schedule.reducer';

interface StoreLike {
  select(selector: unknown): Observable<unknown>;
}

describe('ScheduleEffects (Injector.create)', () => {
  const makeInjector = (opts: {
    initialDataLoaded?: boolean;
    selectedStopId: string | null;
    selectedDayType: string | null;
    selectedDirection: DirectionName | null;
    getStopsImpl?: () => Observable<Stop[]>;
    getDayTypesImpl?: () => Observable<DayType[]>;
    getDirectionsImpl?: () => Observable<Direction[]>;
    getTimetableImpl?: (
      stopId: string,
      dayTypeName: string,
      directionName: string,
    ) => Observable<Timetable>;
  }) => {
    const actions$ = new Subject<Action>();

    const storeObj: StoreLike = {
      select: (selector: unknown) => {
        if (selector === scheduleFeature.selectInitialDataLoaded) {
          return of(opts.initialDataLoaded ?? true);
        }
        if (selector === scheduleFeature.selectSelectedStopId) {
          return of(opts.selectedStopId);
        }
        if (selector === scheduleFeature.selectSelectedDayTypeName) {
          return of(opts.selectedDayType);
        }
        if (selector === scheduleFeature.selectSelectedDirectionName) {
          return of(opts.selectedDirection);
        }

        return of(null);
      },
    };

    const defaultTimetable: Timetable = {
      id: 'tt-1',
      name: 'Weekday Forward',
      stopId: 'stop-1',
      validFrom: '2026-01-01',
      dayType: 'weekday',
      direction: 'forward',
      times: [{ time: '10:00', runNumber: 1 }],
    };

    const scheduleApiMock: Pick<
      ScheduleApiService,
      'getStops' | 'getDayTypes' | 'getDirections' | 'getTimetable'
    > = {
      getStops: opts.getStopsImpl ? vi.fn(opts.getStopsImpl) : vi.fn(() => of([])),
      getDayTypes: opts.getDayTypesImpl
        ? vi.fn(opts.getDayTypesImpl)
        : vi.fn(() => of([])),
      getDirections: opts.getDirectionsImpl
        ? vi.fn(opts.getDirectionsImpl)
        : vi.fn(() => of([])),
      getTimetable:
        opts.getTimetableImpl ??
        vi.fn(() => {
          return of(defaultTimetable);
        }),
    };

    const routerMock: Pick<Router, 'createUrlTree' | 'serializeUrl' | 'navigate'> =
      {
        createUrlTree: vi.fn(() => ({} as ReturnType<Router['createUrlTree']>)),
        serializeUrl: vi.fn(() => '/schedule'),
        navigate: vi.fn(async () => true),
      };

    const activatedRouteMock: Pick<ActivatedRoute, 'queryParamMap'> = {
      queryParamMap: of(convertToParamMap({})),
    };

    const locationMock: Pick<Location, 'replaceState'> = {
      replaceState: vi.fn(),
    };

    const injector = Injector.create({
      providers: [
        { provide: Actions, useValue: new Actions(actions$) },
        { provide: Store, useValue: storeObj },
        { provide: ScheduleApiService, useValue: scheduleApiMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Location, useValue: locationMock },
        { provide: PLATFORM_ID, useValue: 'browser' },
        ScheduleEffects,
      ],
    });

    return {
      actions$,
      effects: injector.get(ScheduleEffects),
      mocks: { scheduleApiMock },
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('triggerLoadTimetable$ emits loadTimetable on stop selection when selection is complete', async () => {
    const { actions$, effects } = makeInjector({
      selectedStopId: 'stop-1',
      selectedDayType: 'weekday',
      selectedDirection: 'forward',
    });

    const emitted = firstValueFrom(effects.triggerLoadTimetable$);
    actions$.next(SchedulePageActions.selectStop({ stopId: 'stop-1' }));

    await expect(emitted).resolves.toEqual(ScheduleApiActions.loadTimetable());
  });

  it('executeLoadTimetable$ emits success and calls api when selection is complete', async () => {
    const timetable: Timetable = {
      id: 'tt-2',
      name: 'Weekday Forward',
      stopId: 'stop-1',
      validFrom: '2026-01-01',
      dayType: 'weekday',
      direction: 'forward',
      times: [{ time: '10:05', runNumber: 2 }],
    };

    const getTimetable: (
      stopId: string,
      dayTypeName: string,
      directionName: string,
    ) => Observable<Timetable> = vi.fn(() => of(timetable));
    const { actions$, effects, mocks } = makeInjector({
      selectedStopId: 'stop-1',
      selectedDayType: 'weekday',
      selectedDirection: 'forward',
      getTimetableImpl: getTimetable,
    });

    const emitted = firstValueFrom(effects.executeLoadTimetable$);
    actions$.next(ScheduleApiActions.loadTimetable());

    await expect(emitted).resolves.toEqual(
      ScheduleApiActions.loadTimetableSuccess({ timetable }),
    );
    expect(mocks.scheduleApiMock.getTimetable).toHaveBeenCalledWith(
      'stop-1',
      'weekday',
      'forward',
    );
  });

  it('executeLoadTimetable$ does not call api when required selection is missing', async () => {
    const { actions$, effects, mocks } = makeInjector({
      selectedStopId: null,
      selectedDayType: 'weekday',
      selectedDirection: 'forward',
    });

    const emitted: Action[] = [];
    const sub = effects.executeLoadTimetable$.subscribe((action) =>
      emitted.push(action),
    );

    actions$.next(ScheduleApiActions.loadTimetable());
    await Promise.resolve();

    expect(mocks.scheduleApiMock.getTimetable).not.toHaveBeenCalled();
    expect(emitted).toEqual([]);

    sub.unsubscribe();
  });

  it('loadInitialData$ emits failure when api request fails', async () => {
    const { actions$, effects } = makeInjector({
      initialDataLoaded: false,
      selectedStopId: 'stop-1',
      selectedDayType: 'weekday',
      selectedDirection: 'forward',
      getStopsImpl: () => throwError(() => new Error('boom')),
    });

    const emitted = firstValueFrom(effects.loadInitialData$);
    actions$.next(SchedulePageActions.enter());

    await expect(emitted).resolves.toEqual(
      ScheduleApiActions.loadInitialDataFailure({ error: 'boom' }),
    );
  });

  it('executeLoadTimetable$ emits failure when api errors', async () => {
    const { actions$, effects } = makeInjector({
      selectedStopId: 'stop-1',
      selectedDayType: 'weekday',
      selectedDirection: 'forward',
      getTimetableImpl: () => throwError(() => new Error('timetable failed')),
    });

    const emitted = firstValueFrom(effects.executeLoadTimetable$);
    actions$.next(ScheduleApiActions.loadTimetable());

    await expect(emitted).resolves.toEqual(
      ScheduleApiActions.loadTimetableFailure({ error: 'timetable failed' }),
    );
  });
});
