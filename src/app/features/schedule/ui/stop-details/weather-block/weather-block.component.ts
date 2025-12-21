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
import { SvgIconComponent } from '../../../../../shared/components';

@Component({
  selector: 'app-weather-block',
  imports: [
    DatePipe,
    DecimalPipe,
    NgOptimizedImage,
    TemperaturePipe,
    TitleCasePipe,
    SvgIconComponent,
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

  private readonly windDirs = [
    'N',
    'NE',
    'E',
    'SE',
    'S',
    'SW',
    'W',
    'NW',
  ] as const;

  readonly windDegNorm = computed(() => {
    const w = this.stop().weather;
    const deg = w?.windDeg ?? 0;
    return ((deg % 360) + 360) % 360;
  });

  readonly windDirLabel = computed(() => {
    const deg = this.windDegNorm();
    return this.windDirs[Math.round(deg / 45) % 8];
  });

  readonly windArrowTransform = computed(
    () => `rotate(${this.windDegNorm()}deg)`,
  );

  readonly hasWindGust = computed(() => {
    const w = this.stop().weather;
    if (!w) return false;
    return w.windGust > w.windSpeed + 0.5;
  });

  readonly windGustDelta = computed(() => {
    const w = this.stop().weather;
    if (!w) return 0;
    return Math.max(0, w.windGust - w.windSpeed);
  });
}
