import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  DestroyRef,
} from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../../core/services/toast.service';
import { GeolocationService } from '../../services/geolocation.service';
import { GeolocationError } from '../../services/geolocation.types';

@Component({
  selector: 'app-find-geo-stop',
  imports: [],
  templateUrl: './find-geo-stop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FindGeoStopComponent {
  private toastService = inject(ToastService);
  private readonly geolocation = inject(GeolocationService);
  private readonly destroyRef = inject(DestroyRef);
  public isGeolocationAvailable = signal<boolean>('geolocation' in navigator);

  onClick() {
    this.geolocation
      .getCurrentPosition$({
        enableHighAccuracy: false,
        timeout: 10_000,
        maximumAge: 60_000,
      })
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef),
        catchError((error: GeolocationError) => {
          this.toastService.error(this.getErrorMessage(error), {
            title: 'Failed to get location',
            duration: 5000,
          });
          return EMPTY;
        }),
      )
      .subscribe((position) => {
        this.toastService.success(
          `${position.coords.latitude.toFixed(4)} : ${position.coords.longitude.toFixed(4)}`,
          {
            title: 'Successfully found geolocation',
            duration: 5000,
          },
        );
      });
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
