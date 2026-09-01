import { TZDate } from '@date-fns/tz';

import { DayType } from '../models/daytype.model';
import { DirectionName } from '../models/direction.model';
import { SCHEDULE_TIME_ZONE } from '../models/timetable.model';

export function pickValidStopId(
  stops: { id: string }[],
  candidate: string | null,
): string | null {
  if (!candidate) return null;
  return stops.some((stop) => stop.id === candidate) ? candidate : null;
}

export function pickValidDayTypeName(
  dayTypes: { name: string }[],
  candidate: string | null,
): string | null {
  if (!candidate) return null;
  return dayTypes.some((dayType) => dayType.name === candidate)
    ? candidate
    : null;
}

export function pickValidDirectionName(
  candidate: DirectionName | null,
): DirectionName | null {
  if (!candidate) return null;
  return candidate === 'forward' || candidate === 'backward' ? candidate : null;
}

export function parseDirection(value: string | null): DirectionName | null {
  return value === 'forward' || value === 'backward' ? value : null;
}
export function resolveAutoDayTypeName(
  dayTypes: DayType[],
  today: Date = new Date(),
): string | null {
  if (!dayTypes?.length) {
    return null;
  }

  const dayOfWeek = TZDate.tz(SCHEDULE_TIME_ZONE, today.getTime()).getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const findByName = (name: string) =>
    dayTypes.find((dt) => dt.name === name)?.name ?? null;

  if (isWeekend) {
    return findByName('weekend') ?? findByName('weekday') ?? dayTypes[0].name;
  }

  return findByName('weekday') ?? findByName('weekend') ?? dayTypes[0].name;
}
