import { DestroyRef, Injector } from '@angular/core';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';

import { ToastService } from '@core/services/toast.service';

import { Stop } from '../data-access/models/stop.model';
import { SchedulePageActions } from '../data-access/store/schedule.actions';
import { selectAllScheduleStops } from '../data-access/store/schedule.selectors';

import { ClosestStopService } from './closest-stop.service';
import { GeolocationService } from './geolocation.service';
import { GeolocationErrorCode } from './geolocation.types';
import { GeolocationError } from './geolocation.types';

interface StoreLike {
  select: (selector: typeof selectAllScheduleStops) => Observable<Stop[]>;
  dispatch: (action: unknown) => void;
}

describe('ClosestStopService (Injector.create)', () => {
  const destroyRefStub: DestroyRef = {
    destroyed: false,
    onDestroy: vi.fn(),
  };

  const makePosition = (lat: number, lon: number) => ({
    coords: {
      latitude: lat,
      longitude: lon,
      accuracy: 1,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
      toJSON: () => ({}),
    },
    timestamp: Date.now(),
    toJSON: () => ({}),
  });

  const makeInjector = (opts: {
    position$?: Observable<GeolocationPosition>;
    stops$?: Observable<Stop[]>;
  }) => {
    const dispatch = vi.fn<(action: unknown) => void>();
    const select = vi.fn<
      (selector: typeof selectAllScheduleStops) => Observable<Stop[]>
    >(() => opts.stops$ ?? of([]));

    const storeMock: StoreLike = { select, dispatch };

    const toastMock: Pick<ToastService, 'success' | 'error'> = {
      success:
        vi.fn<
          (
            ...args: Parameters<ToastService['success']>
          ) => ReturnType<ToastService['success']>
        >(),
      error:
        vi.fn<
          (
            ...args: Parameters<ToastService['error']>
          ) => ReturnType<ToastService['error']>
        >(),
    };

    const geoMock: Pick<GeolocationService, 'getCurrentPosition$'> = {
      getCurrentPosition$: vi.fn<
        (
          options: PositionOptions,
        ) => ReturnType<GeolocationService['getCurrentPosition$']>
      >(() => opts.position$ ?? of(makePosition(0, 0))),
    };

    const injector = Injector.create({
      providers: [
        { provide: DestroyRef, useValue: destroyRefStub },
        { provide: Store, useValue: storeMock },
        { provide: ToastService, useValue: toastMock },
        { provide: GeolocationService, useValue: geoMock },
        ClosestStopService,
      ],
    });

    return {
      svc: injector.get(ClosestStopService),
      mocks: { dispatch, select, toastMock, geoMock },
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('happy path: sets success, dispatches selectStop, shows success toast', () => {
    const position = makePosition(48.45, 35.05);

    const stops: Stop[] = [
      { id: 'a', name: 'No geo stop' } as Stop,
      { id: 'b', name: 'Far', geo: { lat: 48.0, lon: 35.0 } } as Stop,
      { id: 'c', name: 'Closest', geo: { lat: 48.4501, lon: 35.0501 } } as Stop,
    ];

    const { svc, mocks } = makeInjector({
      position$: of(position),
      stops$: of(stops),
    });

    expect(svc.state()).toEqual({ status: 'idle' });

    svc.findAndSelectStop();

    expect(svc.state().status).toBe('success');

    expect(mocks.dispatch).toHaveBeenCalledWith(
      SchedulePageActions.selectStop({ stopId: 'c' }),
    );

    expect(mocks.toastMock.success).toHaveBeenCalledWith(
      'Closest stop: Closest',
      { title: 'Stop selected by location' },
    );

    expect(mocks.toastMock.error).not.toHaveBeenCalled();
  });

  it('no stops with geo: sets error, does not dispatch, shows error toast', () => {
    const position = makePosition(48.45, 35.05);

    const stops: Stop[] = [
      { id: 'a', name: 'Stop A' } as Stop,
      { id: 'b', name: 'Stop B' } as Stop,
    ];

    const { svc, mocks } = makeInjector({
      position$: of(position),
      stops$: of(stops),
    });

    svc.findAndSelectStop();

    const state = svc.state();
    expect(state.status).toBe('error');
    if (state.status === 'error') {
      expect(state.error.code).toBe('unknown');
    }

    expect(mocks.dispatch).not.toHaveBeenCalled();

    expect(mocks.toastMock.error).toHaveBeenCalledWith(
      'No stops with location data are available. Please try again later.',
      { title: 'Failed to find closest stop' },
    );
  });

  it('geolocation error: sets error and shows mapped error message', () => {
    const error: GeolocationError = {
      code: GeolocationErrorCode.PermissionDenied,
      message: 'User denied Geolocation',
    };

    const { svc, mocks } = makeInjector({
      position$: throwError(() => error),
      stops$: of([]),
    });

    svc.findAndSelectStop();

    const state = svc.state();
    expect(state.status).toBe('error');
    if (state.status === 'error') {
      expect(state.error).toEqual(error);
    }

    expect(mocks.dispatch).not.toHaveBeenCalled();

    expect(mocks.toastMock.error).toHaveBeenCalledWith(
      'Please allow location access in your browser settings.',
      { title: 'Failed to get location' },
    );
  });

  it('sets loading immediately after call (cheap sanity check)', () => {
    const never$ = new Observable<GeolocationPosition>(() => {
      return undefined;
    });

    const { svc } = makeInjector({
      position$: never$,
      stops$: of([]),
    });

    svc.findAndSelectStop();

    expect(svc.state()).toEqual({ status: 'loading' });
  });
});
