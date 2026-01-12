import { DayType } from '@features/schedule/data-access/models/daytype.model';
import { DirectionName } from '@features/schedule/data-access/models/direction.model';

export function pickValidStopId(
  stops: { id: string }[],
  candidate: string | null,
): string | null {
  if (!candidate) return null;
  return stops.some((s) => s.id === candidate) ? candidate : null;
}

export function pickValidDayTypeName(
  dayTypes: { name: string }[],
  candidate: string | null,
): string | null {
  if (!candidate) return null;
  return dayTypes.some((dt) => dt.name === candidate) ? candidate : null;
}

export function pickValidDirectionName(
  candidate: DirectionName | null,
): DirectionName | null {
  if (!candidate) return null;
  return candidate === 'forward' || candidate === 'backward' ? candidate : null;
}

export function parseDirection(v: string | null): DirectionName | null {
  return v === 'forward' || v === 'backward' ? v : null;
}
export function resolveAutoDayTypeName(
  dayTypes: DayType[],
  today: Date = new Date(),
): string | null {
  if (!dayTypes?.length) {
    return null;
  }

  const dayOfWeek = today.getDay(); // 0 - Sunday, 6 - Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const findByName = (name: string) =>
    dayTypes.find((dt) => dt.name === name)?.name ?? null;

  if (isWeekend) {
    return findByName('weekend') ?? findByName('weekday') ?? dayTypes[0].name;
  }

  return findByName('weekday') ?? findByName('weekend') ?? dayTypes[0].name;
}
