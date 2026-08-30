import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';

import { DirectionName } from '../../data-access/models/direction.model';
import { Weather } from '../../data-access/models/weather.model';
import { WeatherApiService } from '../../data-access/services/weather-api.service';
import { scheduleFeature } from '../../data-access/store/schedule.reducer';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  const stopId$ = new BehaviorSubject<string | null>('stop-1');
  const direction$ = new BehaviorSubject<DirectionName | null>('forward');
  const weather: Weather = {
    temperature: 28.61,
    description: 'broken clouds',
    icon: '04d',
    feelsLike: 27.33,
    pressure: 1020,
    humidity: 25,
    sunrise: 1788058430000,
    sunset: 1788107219000,
    windSpeed: 2.98,
    windDeg: 103,
    windGust: 3.4,
  };
  const getWeather = vi.fn(() => of(weather));

  beforeEach(() => {
    vi.useFakeTimers();
    stopId$.next('stop-1');
    direction$.next('forward');
    getWeather.mockClear();

    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: WeatherApiService, useValue: { getWeather } },
        {
          provide: Store,
          useValue: {
            select: (selector: unknown) =>
              selector === scheduleFeature.selectSelectedStopId
                ? stopId$
                : direction$,
          },
        },
      ],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
  });

  it('loads immediately and polls every 15 minutes', async () => {
    const service = TestBed.inject(WeatherService);

    await vi.advanceTimersByTimeAsync(0);
    expect(getWeather).toHaveBeenCalledTimes(1);
    expect(getWeather).toHaveBeenLastCalledWith('stop-1', 'forward');
    expect(service.state()).toEqual({ status: 'ready', weather });

    await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
    expect(getWeather).toHaveBeenCalledTimes(2);
  });

  it('restarts immediately for a changed selection', async () => {
    TestBed.inject(WeatherService);
    await vi.advanceTimersByTimeAsync(0);

    direction$.next('backward');
    await vi.advanceTimersByTimeAsync(0);

    expect(getWeather).toHaveBeenCalledTimes(2);
    expect(getWeather).toHaveBeenLastCalledWith('stop-1', 'backward');
  });
});
