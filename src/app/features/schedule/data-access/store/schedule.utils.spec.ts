import { describe, expect, it } from 'vitest';

import { DayType } from '../models/daytype.model';

import { resolveAutoDayTypeName } from './schedule.utils';

describe('resolveAutoDayTypeName', () => {
  const dayTypes: DayType[] = [
    { id: 'weekday', name: 'weekday', label: 'Weekday' },
    { id: 'weekend', name: 'weekend', label: 'Weekend' },
  ];

  it('uses the calendar day in Kyiv near midnight', () => {
    const fridayInUtcAndSaturdayInKyiv = new Date('2026-07-24T21:30:00.000Z');

    expect(resolveAutoDayTypeName(dayTypes, fridayInUtcAndSaturdayInKyiv)).toBe(
      'weekend',
    );
  });
});
