import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { take, withLatestFrom } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { COPY } from '@core/content';
import { ToastService } from '@core/services/toast.service';

import { Stop } from '../../data-access/models/stop.model';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';
import { selectAllScheduleStops } from '../../data-access/store/schedule.selectors';

import { GeoState } from './closest-stop.types';
import { GeolocationService } from './geolocation.service';
import { GeolocationError } from './geolocation.types';

@Injectable()
export class ClosestStopService {
  private readonly copy = COPY.schedule.services.closestStop;
  private readonly geolocationCopy = COPY.schedule.services.geolocation;
  private readonly destroyRef = inject(DestroyRef);
  protected readonly geolocation = inject(GeolocationService);
  private readonly toastService = inject(ToastService);
  private readonly store = inject(Store);
  public state = signal<GeoState>({ status: 'idle' });

  public findAndSelectStop(): void {
    this.state.set({ status: 'loading' });

    this.geolocation
      .getCurrentPosition$({
        enableHighAccuracy: false,
        timeout: 10_000,
        maximumAge: 60_000,
      })
      .pipe(
        take(1),
        withLatestFrom(this.store.select(selectAllScheduleStops)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: ([position, stops]) => {
          const closestStop = this.findClosestStop(position, stops);

          if (!closestStop) {
            this.state.set({
              status: 'error',
              error: {
                code: 'unknown',
                message: this.copy.noStopsWithCoordinatesFound,
              } as GeolocationError,
            });

            this.toastService.error(
              this.copy.noStopsWithLocationDataAvailable,
              {
                title: this.copy.failedToFindClosestStop,
              },
            );
            return;
          }

          this.state.set({ status: 'success', position });

          this.store.dispatch(
            SchedulePageActions.selectStop({ stopId: closestStop.id }),
          );

          this.toastService.success(
            `${this.copy.closestStopPrefix} ${closestStop.name}`,
            {
              title: this.copy.stopSelectedByLocation,
            },
          );
        },

        error: (error: GeolocationError) => {
          this.state.set({ status: 'error', error });
          this.toastService.error(this.getErrorMessage(error), {
            title: this.copy.failedToGetLocation,
          });
        },
      });
  }

  private findClosestStop(
    position: GeolocationPosition,
    stops: Stop[],
  ): Stop | null {
    const { latitude, longitude } = position.coords;

    let closest: Stop | null = null;
    let minDistance = Number.POSITIVE_INFINITY;

    for (const stop of stops) {
      const points = [stop.geo?.forward, stop.geo?.backward].filter(
        (point): point is { lat: number; lon: number } => !!point,
      );

      if (points.length === 0) {
        continue;
      }

      for (const point of points) {
        const distance = this.getDistanceMeters(
          latitude,
          longitude,
          point.lat,
          point.lon,
        );
        if (distance < minDistance) {
          minDistance = distance;
          closest = stop;
        }
      }
    }

    return closest;
  }

  private getDistanceMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const R = 6_371_000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private getErrorMessage(error: GeolocationError): string {
    switch (error.code) {
      case 'permission-denied':
        return this.geolocationCopy.allowLocationAccessInBrowserSettings;
      case 'position-unavailable':
        return this.geolocationCopy.unableToDetermineLocation;
      case 'timeout':
        return this.geolocationCopy.locationRequestTooLong;
      case 'not-supported':
        return this.geolocationCopy.browserDoesNotSupportGeolocation;
      default:
        return this.geolocationCopy.somethingWentWrongGettingLocation;
    }
  }
}
