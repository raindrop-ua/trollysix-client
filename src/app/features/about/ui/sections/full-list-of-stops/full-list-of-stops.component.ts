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

import { copy } from '@core/content';

import { RouteStop } from '@features/about/data-access/models/route-stops.model';
import { StopsListService } from '@features/about/data-access/services/stops-list.service';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component';

import { StopsListComponent } from './stops-list/stops-list.component';

@Component({
  selector: 'trollysix-full-list-of-stops',
  imports: [GenericSectionBlockComponent, StopsListComponent, SpinnerComponent],
  templateUrl: './full-list-of-stops.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class FullListOfStopsComponent implements OnInit {
  public readonly copyAbout = copy('about');
  private stopsListService = inject(StopsListService);
  private destroyRef = inject(DestroyRef);
  public readonly routeStops = signal<RouteStop[]>([]);
  public readonly isLoading = signal(true);

  public ngOnInit(): void {
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
