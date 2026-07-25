import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { firstValueFrom } from 'rxjs';

import { Direction } from '../models/direction.model';
import { Stop } from '../models/stop.model';
import { Timetable } from '../models/timetable.model';

import { ScheduleApiService } from './schedule.api.service';

describe('ScheduleApiService', () => {
  const setup = (platformId: 'browser' | 'server') => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ScheduleApiService,
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });

    return {
      service: TestBed.inject(ScheduleApiService),
      transferState: TestBed.inject(TransferState),
      http: TestBed.inject(HttpTestingController),
    };
  };

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  beforeEach(() => {
    TestBed.resetTestingModule();
  });

  it('returns cached stops from TransferState and removes key on browser', async () => {
    const { service, transferState, http } = setup('browser');
    const key = makeStateKey<Stop[]>('schedule:stops');
    const cachedStops: Stop[] = [
      {
        id: '1',
        name: 'Central',
        departures: {},
        style: 1,
        rating: null,
        availableDirections: ['forward'],
        sharedRoutes: [],
      },
    ];
    transferState.set(key, cachedStops);

    const result = await firstValueFrom(service.getStops());

    expect(result).toEqual(cachedStops);
    expect(transferState.hasKey(key)).toBe(false);
    http.expectNone('http://localhost:4450/stops');
  });

  it('stores response into TransferState on server', async () => {
    const { service, transferState, http } = setup('server');
    const key = makeStateKey<Direction[]>('schedule:directions');

    const request = firstValueFrom(service.getDirections());
    const req = http.expectOne('http://localhost:4450/directions');
    const response: Direction[] = [
      { id: '1', name: 'forward', label: 'Forward' },
    ];
    req.flush({ statusCode: 200, message: 'success', data: response });

    const result = await request;
    expect(result).toEqual(response);
    expect(transferState.get(key, [])).toEqual(response);
  });

  it('falls back to http when cached TransferState payload is invalid', async () => {
    const { service, transferState, http } = setup('browser');
    const key = makeStateKey<unknown>('schedule:directions');
    transferState.set(key, [{ id: '1', name: 'sideways', label: 'Sideways' }]);

    const request = firstValueFrom(service.getDirections());
    const req = http.expectOne('http://localhost:4450/directions');
    const response: Direction[] = [
      { id: '1', name: 'forward', label: 'Forward' },
    ];
    req.flush({ statusCode: 200, message: 'success', data: response });

    await expect(request).resolves.toEqual(response);
    expect(transferState.hasKey(key)).toBe(false);
  });

  it('requests timetable with query params', async () => {
    const { service, http } = setup('browser');
    const request = firstValueFrom(
      service.getTimetable('stop-1', 'weekday', 'forward'),
    );

    const req = http.expectOne(
      (r) =>
        r.url === 'http://localhost:4450/timetables' &&
        r.params.get('stopId') === 'stop-1' &&
        r.params.get('dayType') === 'weekday' &&
        r.params.get('direction') === 'forward',
    );

    const response: Timetable = {
      id: 'tt-1',
      name: 'Weekday Forward',
      stopId: 'stop-1',
      validFrom: '2026-01-01',
      dayType: 'weekday',
      direction: 'forward',
      times: [{ time: '10:00', runNumber: 1 }],
    };
    req.flush({ statusCode: 200, message: 'success', data: response });

    await expect(request).resolves.toEqual(response);
  });

  it('rejects invalid api payload by contract', async () => {
    const { service, http } = setup('browser');
    const request = firstValueFrom(service.getDirections());

    const req = http.expectOne('http://localhost:4450/directions');
    req.flush({
      statusCode: 200,
      message: 'success',
      data: [{ id: '1', name: 'sideways', label: 'Sideways' }],
    });

    await expect(request).rejects.toThrowError(
      'Invalid schedule API response: directions',
    );
  });
});
