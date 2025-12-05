import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  DestroyRef,
  signal,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../../core/services/toast.service';
import { GeolocationService } from '../../services/geolocation.service';
import { GeolocationError } from '../../services/geolocation.types';

type GeoState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; position: GeolocationPosition }
  | { status: 'error'; error: GeolocationError };

@Component({
  selector: 'app-find-geo-stop',
  imports: [],
  templateUrl: './find-geo-stop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FindGeoStopComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);
  protected readonly geolocation = inject(GeolocationService);
  state = signal<GeoState>({ status: 'idle' });

  onClick() {
    this.state.set({ status: 'loading' });

    this.geolocation
      .getCurrentPosition$({
        enableHighAccuracy: false,
        timeout: 10_000,
        maximumAge: 60_000,
      })
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (position) => {
          this.state.set({ status: 'success', position });
          this.toastService.success(
            `${position.coords.latitude.toFixed(4)} : ${position.coords.longitude.toFixed(4)}`,
            { title: 'Successfully found geolocation', duration: 5000 },
          );
        },
        error: (error: GeolocationError) => {
          this.state.set({ status: 'error', error });
          this.toastService.error(this.getErrorMessage(error), {
            title: 'Failed to get location',
            duration: 5000,
          });
        },
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
