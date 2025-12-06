import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { TemperaturePipe } from '../../../../shared/pipes/temperature.pipe';
import { Stop } from '../../data-access/models/stop.model';
import { GeoBadgeComponent } from '../geo-badge/geo-badge.component';
import { GenericSectionBlockComponent } from '../../../../shared/components/sections';

@Component({
  selector: 'app-stop-details',
  imports: [
    TemperaturePipe,
    TitleCasePipe,
    NgOptimizedImage,
    GeoBadgeComponent,
    GenericSectionBlockComponent,
  ],
  templateUrl: './stop-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StopDetailsComponent {
  stopData = input.required<Stop>();

  readonly weatherIconUrl = computed(() => {
    const weather = this.stopData().weather;
    if (!weather?.icon) {
      return `${environment.WEATHER_ICON_BASE}/default@2x.png`;
    }
    return `${environment.WEATHER_ICON_BASE}/${weather.icon}@2x.png`;
  });
}
