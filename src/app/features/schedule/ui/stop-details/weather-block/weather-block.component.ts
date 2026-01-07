import {
  DatePipe,
  DecimalPipe,
  NgOptimizedImage,
  TitleCasePipe,
} from '@angular/common';
import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { environment } from '@environments/environment';

import { TemperaturePipe } from '@app/shared/pipes/temperature.pipe';
import { SvgIconComponent } from '@app/shared/ui';
import { Stop } from '@features/schedule/data-access/models/stop.model';

@Component({
  selector: 'trollysix-weather-block',
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
  host: { class: 'block h-full' },
})
export class WeatherBlockComponent {
  stop = input.required<Stop>();

  readonly weatherIconUrl = computed(() => {
    const weather = this.stop().weather;
    if (!weather?.icon) {
      return `${environment.WEATHER_ICON_BASE}default@2x.png`;
    }
    return `${environment.WEATHER_ICON_BASE}${weather.icon}@2x.png`;
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
