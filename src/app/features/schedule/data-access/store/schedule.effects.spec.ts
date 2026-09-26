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
import { selectSelectedTime } from './schedule.selectors';

interface StoreLike {
  select(selector: unknown): Observable<unknown>;
}

describe('ScheduleEffects (Injector.create)', () => {
  const makeInjector = (opts: {
    initialDataLoaded?: boolean;
    selectedTime?: string | null;
    queryParams?: Record<string, string>;
    platform?: string;
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

        if (selector === selectSelectedTime)
          return of(opts.selectedTime ?? null);
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
      getStops: opts.getStopsImpl
        ? vi.fn(opts.getStopsImpl)
        : vi.fn(() => of([])),
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

    const routerMock: Pick<
      Router,
      'createUrlTree' | 'serializeUrl' | 'navigate'
    > = {
      createUrlTree: vi.fn(() => ({}) as ReturnType<Router['createUrlTree']>),
      serializeUrl: vi.fn(() => '/schedule'),
      navigate: vi.fn(async () => true),
    };

    const activatedRouteMock: Pick<ActivatedRoute, 'queryParamMap'> = {
      queryParamMap: of(convertToParamMap(opts.queryParams ?? {})),
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
        { provide: PLATFORM_ID, useValue: opts.platform ?? 'browser' },
        ScheduleEffects,
      ],
    });

    return {
      actions$,
      effects: injector.get(ScheduleEffects),
      mocks: { scheduleApiMock, routerMock, locationMock },
    };
  };

  it('hydrates the selected departure from a shared URL', async () => {
    const { actions$, effects } = makeInjector({
      selectedStopId: null,
      selectedDayType: null,
      selectedDirection: null,
      queryParams: {
        stopId: 'stop-1',
        dayType: 'weekday',
        direction: 'forward',
        time: '08:30',
      },
    });
    const result = firstValueFrom(effects.hydrateFromUrlOnEnter$);
    actions$.next(SchedulePageActions.enter());
    await expect(result).resolves.toEqual(
      SchedulePageActions.hydrateFromUrl({
        stopId: 'stop-1',
        dayTypeName: 'weekday',
        directionName: 'forward',
        time: '08:30',
      }),
    );
  });

  it('syncs selection, stop changes, and deselection to the URL without loading a timetable', () => {
    const opts = {
      selectedStopId: 'stop-1',
      selectedDayType: 'weekday',
      selectedDirection: 'forward' as const,
      selectedTime: '08:30' as string | null,
    };
    // Re-subscribe for each state snapshot, as Store selectors emit after the reducer.
    for (const [stopId, time] of [
      ['stop-1', '08:30'],
      ['stop-2', null],
      ['stop-1', '08:30'],
      ['stop-1', null],
    ]) {
      const { actions$, effects, mocks } = makeInjector({
        ...opts,
        selectedStopId: stopId,
        selectedTime: time,
      });
      const sync = effects.syncStoreToUrl$.subscribe();
      const loads: Action[] = [];
      const load = effects.triggerLoadTimetable$.subscribe((action) =>
        loads.push(action),
      );
      actions$.next(SchedulePageActions.toggleTime({ time: '08:30' }));
      expect(mocks.routerMock.createUrlTree).toHaveBeenLastCalledWith(
        [],
        expect.objectContaining({
          queryParams: {
            stopId,
            dayType: 'weekday',
            direction: 'forward',
            time,
          },
        }),
      );
      expect(mocks.locationMock.replaceState).toHaveBeenCalledWith('/schedule');
      expect(loads).toEqual([]);
      sync.unsubscribe();
      load.unsubscribe();
    }
  });

  it('does not write browser history on the server or before initial data resolves', () => {
    for (const options of [
      { platform: 'server' },
      { initialDataLoaded: false },
    ]) {
      const { actions$, effects, mocks } = makeInjector({
        selectedStopId: 'stop-1',
        selectedDayType: 'weekday',
        selectedDirection: 'forward',
        ...options,
      });
      const sub = effects.syncStoreToUrl$.subscribe();
      actions$.next(
        SchedulePageActions.hydrateFromUrl({
          stopId: 'stop-1',
          dayTypeName: 'weekday',
          directionName: 'forward',
          time: '08:30',
        }),
      );
      expect(mocks.locationMock.replaceState).not.toHaveBeenCalled();
      sub.unsubscribe();
    }
  });

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
