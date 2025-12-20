import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  DatePipe,
  DecimalPipe,
  NgOptimizedImage,
  TitleCasePipe,
} from '@angular/common';
import { TemperaturePipe } from '../../../../../shared/pipes/temperature.pipe';
import { Stop } from '../../../data-access/models/stop.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-weather-block',
  imports: [
    DatePipe,
    DecimalPipe,
    NgOptimizedImage,
    TemperaturePipe,
    TitleCasePipe,
  ],
  templateUrl: './weather-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block h-full' },
})
export class WeatherBlockComponent {
  stop = input.required<Stop>();

  readonly weatherIconUrl = computed(() => {
    const weather = this.stop().weather;
    if (!weather?.icon) {
      return `${environment.WEATHER_ICON_BASE}/default@2x.png`;
    }
    return `${environment.WEATHER_ICON_BASE}/${weather.icon}@2x.png`;
  });
}
