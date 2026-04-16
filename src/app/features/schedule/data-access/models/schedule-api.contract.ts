import { DayType, DayTypeName } from './daytype.model';
import { Direction, DirectionName } from './direction.model';
import { Stop } from './stop.model';
import { TimeEntity, Timetable } from './timetable.model';
import { Weather } from './weather.model';

const DAY_TYPE_NAMES: ReadonlySet<DayTypeName> = new Set(['weekday', 'weekend']);
const DIRECTION_NAMES: ReadonlySet<DirectionName> = new Set([
  'forward',
  'backward',
]);

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isDirectionName(value: unknown): value is DirectionName {
  return isString(value) && DIRECTION_NAMES.has(value as DirectionName);
}

function isDayTypeName(value: unknown): value is DayTypeName {
  return isString(value) && DAY_TYPE_NAMES.has(value as DayTypeName);
}

function isWeather(value: unknown): value is Weather {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isFiniteNumber(value['temperature']) &&
    isString(value['description']) &&
    isString(value['icon']) &&
    isFiniteNumber(value['feelsLike']) &&
    isFiniteNumber(value['pressure']) &&
    isFiniteNumber(value['humidity']) &&
    isFiniteNumber(value['sunrise']) &&
    isFiniteNumber(value['sunset']) &&
    isFiniteNumber(value['windSpeed']) &&
    isFiniteNumber(value['windDeg']) &&
    isFiniteNumber(value['windGust'])
  );
}

function isGeo(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }

  return isFiniteNumber(value['lat']) && isFiniteNumber(value['lon']);
}

function isDepartureBound(value: unknown): boolean {
  if (value === undefined) {
    return true;
  }

  if (!isRecord(value)) {
    return false;
  }

  return isString(value['first']) && isString(value['last']);
}

function isStop(value: unknown): value is Stop {
  if (!isRecord(value)) {
    return false;
  }

  if (!isRecord(value['departures'])) {
    return false;
  }

  if (!Array.isArray(value['availableDirections'])) {
    return false;
  }

  if (
    !Array.isArray(value['sharedRoutes']) ||
    !value['sharedRoutes'].every((route) => isString(route))
  ) {
    return false;
  }

  return (
    isString(value['id']) &&
    isString(value['name']) &&
    isFiniteNumber(value['style']) &&
    value['availableDirections'].every((direction) => isDirectionName(direction)) &&
    isDepartureBound(value['departures']['forward']) &&
    isDepartureBound(value['departures']['backward']) &&
    (value['geo'] === undefined || isGeo(value['geo'])) &&
    (value['weather'] === undefined || isWeather(value['weather']))
  );
}

function isDayType(value: unknown): value is DayType {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value['id']) &&
    isDayTypeName(value['name']) &&
    isString(value['label'])
  );
}

function isDirection(value: unknown): value is Direction {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value['id']) &&
    isDirectionName(value['name']) &&
    isString(value['label'])
  );
}

function isTimeEntity(value: unknown): value is TimeEntity {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value['time']) &&
    (value['runNumber'] === null || isFiniteNumber(value['runNumber'])) &&
    (value['isCanceled'] === undefined || typeof value['isCanceled'] === 'boolean')
  );
}

function isTimetable(value: unknown): value is Timetable {
  if (!isRecord(value)) {
    return false;
  }

  if (!Array.isArray(value['times']) || !value['times'].every((t) => isTimeEntity(t))) {
    return false;
  }

  return (
    isString(value['id']) &&
    isString(value['name']) &&
    isString(value['stopId']) &&
    isString(value['validFrom']) &&
    isDayTypeName(value['dayType']) &&
    isDirectionName(value['direction'])
  );
}

function fail(label: string): never {
  throw new Error(`Invalid schedule API response: ${label}`);
}

export function parseStopsResponse(value: unknown): Stop[] {
  if (!Array.isArray(value) || !value.every((item) => isStop(item))) {
    fail('stops');
  }

  return value;
}

export function parseDayTypesResponse(value: unknown): DayType[] {
  if (!Array.isArray(value) || !value.every((item) => isDayType(item))) {
    fail('dayTypes');
  }

  return value;
}

export function parseDirectionsResponse(value: unknown): Direction[] {
  if (!Array.isArray(value) || !value.every((item) => isDirection(item))) {
    fail('directions');
  }

  return value;
}

export function parseTimetableResponse(value: unknown): Timetable {
  if (!isTimetable(value)) {
    fail('timetable');
  }

  return value;
}
