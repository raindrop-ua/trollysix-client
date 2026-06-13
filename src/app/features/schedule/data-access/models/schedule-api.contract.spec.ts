import { describe, expect, it } from 'vitest';

import {
  parseDayTypesResponse,
  parseDirectionsResponse,
  parseStopsResponse,
  parseTimetableResponse,
} from './schedule-api.contract';

describe('schedule-api.contract', () => {
  it('parses valid stops payload', () => {
    const parsed = parseStopsResponse([
      {
        id: 'stop-1',
        name: 'Central',
        departures: {
          forward: { first: '05:00', last: '23:00' },
        },
        style: 1,
        availableDirections: ['forward', 'backward'],
        sharedRoutes: ['1A'],
        geo: {
          forward: null,
          backward: { lat: 48.45, lon: 35.06 },
        },
      },
    ]);

    expect(parsed[0]?.id).toBe('stop-1');
  });

  it('parses valid stops payload with day type departures', () => {
    const parsed = parseStopsResponse([
      {
        id: 'stop-2',
        name: 'South',
        departures: {
          weekday: {
            forward: { first: '06:00', last: '22:00' },
            backward: { first: '06:10', last: '22:10' },
          },
          weekend: {
            forward: { first: '07:00', last: '21:00' },
          },
        },
        style: 2,
        availableDirections: ['forward', 'backward'],
        sharedRoutes: ['6'],
      },
    ]);

    expect(parsed[0]?.id).toBe('stop-2');
  });

  it('parses stops payload with null weather', () => {
    const parsed = parseStopsResponse([
      {
        id: 'stop-3',
        name: 'North',
        departures: {
          forward: { first: '05:30', last: '23:30' },
        },
        style: 3,
        availableDirections: ['forward'],
        sharedRoutes: ['9'],
        weather: null,
      },
    ]);

    expect(parsed[0]?.weather).toBeNull();
  });

  it('throws for invalid stops payload', () => {
    expect(() =>
      parseStopsResponse([
        {
          id: 'stop-1',
          name: 'Central',
          // missing required departures/style/directions/sharedRoutes
        },
      ]),
    ).toThrowError('Invalid schedule API response: stops');
  });

  it('parses valid dayTypes payload', () => {
    const parsed = parseDayTypesResponse([
      { id: '1', name: 'weekday', label: 'Weekday' },
      { id: '2', name: 'weekend', label: 'Weekend' },
    ]);

    expect(parsed).toHaveLength(2);
  });

  it('throws for invalid dayTypes payload', () => {
    expect(() =>
      parseDayTypesResponse([{ id: '1', name: 'holiday', label: 'Holiday' }]),
    ).toThrowError('Invalid schedule API response: dayTypes');
  });

  it('parses valid directions payload', () => {
    const parsed = parseDirectionsResponse([
      { id: '1', name: 'forward', label: 'Forward' },
      { id: '2', name: 'backward', label: 'Backward' },
    ]);

    expect(parsed).toHaveLength(2);
  });

  it('throws for invalid directions payload', () => {
    expect(() =>
      parseDirectionsResponse([{ id: '1', name: 'sideways', label: 'Sideways' }]),
    ).toThrowError('Invalid schedule API response: directions');
  });

  it('parses valid timetable payload', () => {
    const parsed = parseTimetableResponse({
      id: 'tt-1',
      name: 'Weekday Forward',
      stopId: 'stop-1',
      validFrom: '2026-01-01',
      dayType: 'weekday',
      direction: 'forward',
      times: [{ time: '10:00', runNumber: 1 }],
    });

    expect(parsed.id).toBe('tt-1');
  });

  it('throws for invalid timetable payload', () => {
    expect(() =>
      parseTimetableResponse({
        id: 'tt-1',
        name: 'Weekday Forward',
        stopId: 'stop-1',
        validFrom: '2026-01-01',
        dayType: 'weekday',
        direction: 'forward',
        times: [{ time: '10:00', runNumber: '1' }],
      }),
    ).toThrowError('Invalid schedule API response: timetable');
  });
});
