import {
  Component,
  inject,
  OnInit,
  signal,
  computed,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
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
  private stopsList: StopsListService = inject(StopsListService);
  public routeStops = signal<RouteStop[]>([]);

  ngOnInit() {
    this.stopsList.getStops().subscribe((stops) => {
      this.routeStops.set(stops);
    });
  }

  public readonly routeStopsForward = computed(() => {
    return this.routeStops().filter((stop) => stop.direction === 'forward');
  });

  public readonly routeStopsBackward = computed(() => {
    return this.routeStops().filter((stop) => stop.direction === 'backward');
  });
}
