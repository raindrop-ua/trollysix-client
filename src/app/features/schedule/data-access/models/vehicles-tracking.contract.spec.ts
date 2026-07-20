import { describe, expect, it } from 'vitest';

import { parseVehiclesTrackingResponse } from './vehicles-tracking.contract';

const availableResponse = {
  status: 'available',
  reason: 'available',
  receivedAt: '2026-07-20T08:31:04.100Z',
  sourceUpdatedAt: '2026-07-20T08:30:49.000Z',
  nextUpdateExpectedInMs: 15_000,
  vehicles: [
    {
      boardNumber: '2006',
      speedKph: 20,
      isEnabled: true,
      isSleeping: false,
      ignoredByPresentation: true,
    },
    {
      boardNumber: '1012',
      speedKph: null,
      isEnabled: false,
      isSleeping: false,
    },
  ],
};

describe('parseVehiclesTrackingResponse', () => {
  it('accepts an available response and sorts vehicles by board number', () => {
    const response = parseVehiclesTrackingResponse(availableResponse);

    expect(response.vehicles.map((vehicle) => vehicle.boardNumber)).toEqual([
      '1012',
      '2006',
    ]);
  });

  it.each([
    'outside_service_hours',
    'waiting_for_first_update',
    'gps_data_unavailable',
    'upstream_unavailable',
    'stale_data',
    'polling_disabled',
  ])('accepts the unavailable reason %s', (reason) => {
    const response = parseVehiclesTrackingResponse({
      ...availableResponse,
      status: 'unavailable',
      reason,
      receivedAt: null,
      sourceUpdatedAt: null,
      vehicles: [],
    });

    expect(response.vehicles).toEqual([]);
  });

  it('rejects malformed required values', () => {
    expect(() =>
      parseVehiclesTrackingResponse({
        ...availableResponse,
        receivedAt: 'not-a-date',
      }),
    ).toThrow();
  });
});
