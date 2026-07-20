import {
  TrackedVehicle,
  VehiclesTrackingReason,
  VehiclesTrackingResponse,
  VehiclesTrackingStatus,
} from './vehicles-tracking.model';

const STATUSES: ReadonlySet<VehiclesTrackingStatus> = new Set([
  'available',
  'unavailable',
]);
const REASONS: ReadonlySet<VehiclesTrackingReason> = new Set([
  'available',
  'outside_service_hours',
  'waiting_for_first_update',
  'gps_data_unavailable',
  'upstream_unavailable',
  'stale_data',
  'polling_disabled',
]);

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isDateString(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function isNullableDateString(value: unknown): value is string | null {
  return value === null || isDateString(value);
}

function parseVehicle(value: unknown): TrackedVehicle {
  if (!isRecord(value)) {
    throw new Error('Invalid tracked vehicle');
  }

  const { boardNumber, speedKph, isEnabled, isSleeping } = value;
  if (
    typeof boardNumber !== 'string' ||
    boardNumber.length === 0 ||
    !(speedKph === null || isFiniteNumber(speedKph)) ||
    typeof isEnabled !== 'boolean' ||
    typeof isSleeping !== 'boolean'
  ) {
    throw new Error('Invalid tracked vehicle');
  }

  return { boardNumber, speedKph, isEnabled, isSleeping };
}

export function parseVehiclesTrackingResponse(
  value: unknown,
): VehiclesTrackingResponse {
  if (!isRecord(value)) {
    throw new Error('Invalid vehicles tracking response');
  }

  const {
    status,
    reason,
    receivedAt,
    sourceUpdatedAt,
    nextUpdateExpectedInMs,
    vehicles,
  } = value;

  if (
    typeof status !== 'string' ||
    !STATUSES.has(status as VehiclesTrackingStatus) ||
    typeof reason !== 'string' ||
    !REASONS.has(reason as VehiclesTrackingReason) ||
    !isNullableDateString(receivedAt) ||
    !isNullableDateString(sourceUpdatedAt) ||
    !isFiniteNumber(nextUpdateExpectedInMs) ||
    !Array.isArray(vehicles)
  ) {
    throw new Error('Invalid vehicles tracking response');
  }

  return {
    status: status as VehiclesTrackingStatus,
    reason: reason as VehiclesTrackingReason,
    receivedAt,
    sourceUpdatedAt,
    nextUpdateExpectedInMs,
    vehicles: vehicles
      .map(parseVehicle)
      .sort((first, second) =>
        first.boardNumber.localeCompare(second.boardNumber, undefined, {
          numeric: true,
        }),
      ),
  };
}
