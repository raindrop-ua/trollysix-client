import { Injector, PLATFORM_ID } from '@angular/core';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { firstValueFrom } from 'rxjs';

import { GeolocationService } from './geolocation.service';
import { GeolocationErrorCode } from './geolocation.types';

const makePosition = (lat: number, lon: number): GeolocationPosition => ({
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

describe('GeolocationService (Injector.create)', () => {
  const originalNavigator = globalThis.navigator;

  const setNavigator = (value: Navigator) => {
    Object.defineProperty(globalThis, 'navigator', {
      value,
      configurable: true,
      writable: true,
    });
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (originalNavigator) setNavigator(originalNavigator);
  });

  it('getCurrentPosition$ -> NotSupported on server platform', async () => {
    setNavigator({} as Navigator);

    const injector = Injector.create({
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' },
        GeolocationService,
      ],
    });

    const svc = injector.get(GeolocationService);

    expect(firstValueFrom(svc.getCurrentPosition$())).rejects.toMatchObject({
      code: GeolocationErrorCode.NotSupported,
    });
  });

  it('getCurrentPosition$ emits position once in browser', async () => {
    const position = makePosition(48.45, 35.05);

    const getCurrentPosition = vi.fn(
      (
        success: PositionCallback,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _error: PositionErrorCallback | null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _options?: PositionOptions,
      ) => {
        success(position);
      },
    );

    setNavigator({
      geolocation: {
        getCurrentPosition,
        watchPosition: vi.fn(),
        clearWatch: vi.fn(),
      } as unknown as Geolocation,
    } as Navigator);

    const injector = Injector.create({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        GeolocationService,
      ],
    });

    const svc = injector.get(GeolocationService);

    const value = await firstValueFrom(svc.getCurrentPosition$());
    expect(value).toBe(position);
    expect(getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  it('watchPosition$ clears watch on unsubscribe', () => {
    const watchId = 123;

    const watchPosition = vi.fn(
      (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _success: PositionCallback,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _error: PositionErrorCallback | null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _options?: PositionOptions,
      ) => watchId,
    );

    const clearWatch = vi.fn((id: number) => undefined);

    setNavigator({
      geolocation: {
        getCurrentPosition: vi.fn(),
        watchPosition,
        clearWatch,
      } as unknown as Geolocation,
    } as Navigator);

    const injector = Injector.create({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        GeolocationService,
      ],
    });

    const svc = injector.get(GeolocationService);

    const sub = svc.watchPosition$().subscribe();
    sub.unsubscribe();

    expect(watchPosition).toHaveBeenCalledTimes(1);
    expect(clearWatch).toHaveBeenCalledWith(watchId);
  });
});
