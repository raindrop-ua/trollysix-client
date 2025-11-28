import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { DecimalPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { TemperaturePipe } from '../../../../shared/pipes/temperature.pipe';
import { Stop } from '../../data-access/models/stop.model';

@Component({
  selector: 'app-stop-details',
  imports: [
    TemperaturePipe,
    DecimalPipe,
    TitleCasePipe,
    SvgIconComponent,
    NgOptimizedImage,
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

  readonly mapsUrl = computed(() => {
    const geo = this.stopData().geo;
    if (!geo) {
      return null;
    }
    const { lat, lon } = geo;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  });
}
