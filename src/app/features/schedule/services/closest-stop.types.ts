import { GeolocationError } from './geolocation.types';

export type GeoState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; position: GeolocationPosition }
  | { status: 'error'; error: GeolocationError };
