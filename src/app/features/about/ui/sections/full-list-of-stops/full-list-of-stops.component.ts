import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SpinnerComponent } from '@app/shared/ui';
import { GenericSectionBlockComponent } from '@app/shared/ui/sections';
import { RouteStop } from '@features/about/data-access/models/route-stops.model';
import { StopsListService } from '@features/about/services/stops-list.service';

import { StopsListComponent } from './stops-list/stops-list.component';

@Component({
  selector: 'trollysix-full-list-of-stops',
  imports: [GenericSectionBlockComponent, StopsListComponent, SpinnerComponent],
  templateUrl: './full-list-of-stops.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
