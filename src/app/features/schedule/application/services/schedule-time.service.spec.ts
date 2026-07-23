import { describe, expect, it } from 'vitest';

import { resolveScheduleDeparture } from './schedule-time.service';

describe('resolveScheduleDeparture', () => {
  const summerDate = new Date('2026-07-23T09:00:00.000Z');

  it('converts Kyiv schedule time to Warsaw time', () => {
    const result = resolveScheduleDeparture(
      '06:00',
      'Europe/Warsaw',
      summerDate,
    );

    expect(result.time).toBe('05:00');
    expect(result.departureAt.toISOString()).toBe('2026-07-23T03:00:00.000Z');
  });

  it('converts Kyiv schedule time to London time', () => {
    const result = resolveScheduleDeparture(
      '06:00',
      'Europe/London',
      summerDate,
    );

    expect(result.time).toBe('04:00');
    expect(result.departureAt.toISOString()).toBe('2026-07-23T03:00:00.000Z');
  });

  it('preserves Kyiv time during server rendering', () => {
    const result = resolveScheduleDeparture('06:00', 'Europe/Kyiv', summerDate);

    expect(result.time).toBe('06:00');
  });
});
