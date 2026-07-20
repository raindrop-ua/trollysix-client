export type VehiclesTrackingStatus = 'available' | 'unavailable';

export type VehiclesTrackingReason =
  | 'available'
  | 'outside_service_hours'
  | 'waiting_for_first_update'
  | 'gps_data_unavailable'
  | 'upstream_unavailable'
  | 'stale_data'
  | 'polling_disabled';

export interface TrackedVehicle {
  readonly boardNumber: string;
  readonly speedKph: number | null;
  readonly isEnabled: boolean;
  readonly isSleeping: boolean;
}

export interface VehiclesTrackingResponse {
  readonly status: VehiclesTrackingStatus;
  readonly reason: VehiclesTrackingReason;
  readonly receivedAt: string | null;
  readonly sourceUpdatedAt: string | null;
  readonly nextUpdateExpectedInMs: number;
  readonly vehicles: readonly TrackedVehicle[];
}
