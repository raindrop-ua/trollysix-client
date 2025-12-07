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
import {
  GenericSectionBlockComponent,
  SpinnerComponent,
} from '../../../../../shared/components/sections';
import { StopsListItemComponent } from './stops-list-item/stops-list-item.component';
import { SvgIconComponent } from '../../../../../shared/components/svg-icon/svg-icon.component';
import { StopsListService } from '../../../services/stops-list.service';

@Component({
  selector: 'app-full-list-of-stops',
  imports: [
    GenericSectionBlockComponent,
    StopsListItemComponent,
    SvgIconComponent,
    SpinnerComponent,
  ],
  templateUrl: './full-list-of-stops.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
