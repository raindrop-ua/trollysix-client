import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, withLatestFrom } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectAllScheduleStops } from '../data-access/store/schedule.selectors';
import { SchedulePageActions } from '../data-access/store/schedule.actions';
import { GeolocationError } from './geolocation.types';
import { Stop } from '../data-access/models/stop.model';
import { ToastService } from '../../../core/services/toast.service';
import { GeolocationService } from './geolocation.service';
import { GeoState } from './closest-stop.types';

@Injectable()
export class ClosestStopService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);
  protected readonly geolocation = inject(GeolocationService);
  private readonly store = inject(Store);
  state = signal<GeoState>({ status: 'idle' });

  public findAndSelectStop() {
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
                message: 'No stops with coordinates found.',
              } as GeolocationError,
            });

            this.toastService.error(
              'No stops with location data are available. Please try again later.',
              {
                title: 'Failed to find closest stop',
              },
            );
            return;
          }

          this.state.set({ status: 'success', position });

          this.store.dispatch(
            SchedulePageActions.selectStop({ stopId: closestStop.id }),
          );

          this.toastService.success(`Closest stop: ${closestStop.name}`, {
            title: 'Stop selected by location',
          });
        },

        error: (error: GeolocationError) => {
          this.state.set({ status: 'error', error });
          this.toastService.error(this.getErrorMessage(error), {
            title: 'Failed to get location',
          });
        },
      });
  }

  private findClosestStop(
    position: GeolocationPosition,
    stops: Stop[],
  ): Stop | null {
    const { latitude, longitude } = position.coords;

    const stopsWithGeo = stops.filter(
      (s): s is Stop & { geo: { lat: number; lon: number } } => !!s.geo,
    );

    if (stopsWithGeo.length === 0) {
      return null;
    }

    let closest = stopsWithGeo[0];
    let minDistance = this.getDistanceMeters(
      latitude,
      longitude,
      closest.geo!.lat,
      closest.geo!.lon,
    );

    for (let i = 1; i < stopsWithGeo.length; i++) {
      const stop = stopsWithGeo[i];
      const distance = this.getDistanceMeters(
        latitude,
        longitude,
        stop.geo!.lat,
        stop.geo!.lon,
      );

      if (distance < minDistance) {
        minDistance = distance;
        closest = stop;
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
        return 'Please allow location access in your browser settings.';
      case 'position-unavailable':
        return 'Unable to determine your location. Try again in a moment.';
      case 'timeout':
        return 'Location request took too long. Please try again.';
      case 'not-supported':
        return 'Your browser does not support geolocation.';
      default:
        return 'Something went wrong while trying to get your location.';
    }
  }
}
