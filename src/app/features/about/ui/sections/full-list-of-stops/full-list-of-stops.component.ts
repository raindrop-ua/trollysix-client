import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  DestroyRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouteStop } from '../../../data-access/models/route-stops.model';
import { StopsListService } from '../../../services/stops-list.service';
import { GenericSectionBlockComponent } from '../../../../../shared/components/sections';
import { StopsListComponent } from './stops-list/stops-list.component';
import { SpinnerComponent } from '../../../../../shared/components';

@Component({
  selector: 'app-full-list-of-stops',
  imports: [GenericSectionBlockComponent, StopsListComponent, SpinnerComponent],
  templateUrl: './full-list-of-stops.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class FullListOfStopsComponent implements OnInit {
  private stopsListService = inject(StopsListService);
  private destroyRef = inject(DestroyRef);
  public readonly routeStops = signal<RouteStop[]>([]);
  public readonly isLoading = signal(true);

  ngOnInit() {
    this.stopsListService
      .getStops()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (stops) => {
          this.routeStops.set(stops);
          this.isLoading.set(false);
        },
        error: () => {
          this.routeStops.set([]);
          this.isLoading.set(false);
        },
      });
  }

  public readonly routeStopsForward = computed(() => {
    return this.routeStops().filter((stop) => stop.direction === 'forward');
  });

  public readonly routeStopsBackward = computed(() => {
    return this.routeStops().filter((stop) => stop.direction === 'backward');
  });
}
