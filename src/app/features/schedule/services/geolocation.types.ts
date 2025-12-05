export enum GeolocationErrorCode {
  PermissionDenied = 'permission-denied',
  PositionUnavailable = 'position-unavailable',
  Timeout = 'timeout',
  NotSupported = 'not-supported',
  Unknown = 'unknown',
}

export interface GeolocationError {
  code: GeolocationErrorCode;
  message: string;
  originalError?: GeolocationPositionError | null;
}
