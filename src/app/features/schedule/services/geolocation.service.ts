import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { GeolocationError, GeolocationErrorCode } from './geolocation.types';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  public isGeolocationAvailable = signal<boolean>(this.hasGeolocationApi());

  public getCurrentPosition$(
    options?: PositionOptions,
  ): Observable<GeolocationPosition> {
    if (!this.isBrowser || typeof navigator === 'undefined') {
      return throwError(() =>
        this.createError(
          GeolocationErrorCode.NotSupported,
          'Geolocation is not available on this platform.',
        ),
      );
    }

    if (!this.hasGeolocationApi()) {
      return throwError(() =>
        this.createError(
          GeolocationErrorCode.NotSupported,
          'Geolocation API is not supported by this browser.',
        ),
      );
    }

    return new Observable<GeolocationPosition>((subscriber) => {
      const successHandler = (position: GeolocationPosition) => {
        subscriber.next(position);
        subscriber.complete();
      };

      const errorHandler = (error: GeolocationPositionError) => {
        subscriber.error(this.mapError(error));
      };

      navigator.geolocation.getCurrentPosition(
        successHandler,
        errorHandler,
        options,
      );

      return () => {
        // no-op
      };
    });
  }

  public watchPosition$(
    options?: PositionOptions,
  ): Observable<GeolocationPosition> {
    if (!this.isBrowser || typeof navigator === 'undefined') {
      return throwError(() =>
        this.createError(
          GeolocationErrorCode.NotSupported,
          'Geolocation is not available on this platform.',
        ),
      );
    }

    if (!this.hasGeolocationApi()) {
      return throwError(() =>
        this.createError(
          GeolocationErrorCode.NotSupported,
          'Geolocation API is not supported by this browser.',
        ),
      );
    }

    return new Observable<GeolocationPosition>((subscriber) => {
      const successHandler = (position: GeolocationPosition) => {
        subscriber.next(position);
      };

      const errorHandler = (error: GeolocationPositionError) => {
        subscriber.error(this.mapError(error));
      };

      const watchId = navigator.geolocation.watchPosition(
        successHandler,
        errorHandler,
        options,
      );

      return () => navigator.geolocation.clearWatch(watchId);
    });
  }

  private createError(
    code: GeolocationErrorCode,
    message: string,
    originalError: GeolocationPositionError | null = null,
  ): GeolocationError {
    return { code, message, originalError };
  }

  private mapError(error: GeolocationPositionError): GeolocationError {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return this.createError(
          GeolocationErrorCode.PermissionDenied,
          'Location permission was denied by the user.',
          error,
        );
      case error.POSITION_UNAVAILABLE:
        return this.createError(
          GeolocationErrorCode.PositionUnavailable,
          'Location information is unavailable.',
          error,
        );
      case error.TIMEOUT:
        return this.createError(
          GeolocationErrorCode.Timeout,
          'Retrieving location took too long.',
          error,
        );
      default:
        return this.createError(
          GeolocationErrorCode.Unknown,
          'An unknown geolocation error occurred.',
          error,
        );
    }
  }

  private hasGeolocationApi(): boolean {
    return (
      this.isBrowser &&
      typeof navigator !== 'undefined' &&
      'geolocation' in navigator
    );
  }
}
