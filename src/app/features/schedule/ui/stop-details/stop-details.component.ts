import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
  inject,
  Signal,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { copy } from '@core/content';

import { DirectionName } from '@features/schedule/data-access/models/direction.model';
import { Geo, Stop } from '@features/schedule/data-access/models/stop.model';
import { selectSelectedDirection } from '@features/schedule/data-access/store/schedule.selectors';
import { GeoBadgeComponent } from '@features/schedule/ui/geo-badge/geo-badge.component';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

import { SharedRoutesComponent } from './shared-routes/shared-routes.component';
import { WeatherBlockComponent } from './weather-block/weather-block.component';

@Component({
  selector: 'trollysix-stop-details',
  imports: [
    GeoBadgeComponent,
    GenericSectionBlockComponent,
    SharedRoutesComponent,
    WeatherBlockComponent,
  ],
  templateUrl: './stop-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopDetailsComponent {
  public readonly copySchedule = copy('schedule');
  private readonly store = inject(Store);

  public stopData = input.required<Stop>();
  public readonly selectedDirection: Signal<DirectionName | null> =
    this.store.selectSignal(selectSelectedDirection);
  public readonly currentGeo: Signal<Geo | null> = computed(() => {
    const stop = this.stopData();
    const direction = this.selectedDirection() as DirectionName | null;
    const byDirection = direction ? stop.geo?.[direction] : null;
    return byDirection ?? stop.geo?.forward ?? stop.geo?.backward ?? null;
  });
}
