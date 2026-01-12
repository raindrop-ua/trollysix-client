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
