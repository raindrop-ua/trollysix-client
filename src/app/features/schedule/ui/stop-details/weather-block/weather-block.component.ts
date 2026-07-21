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
  Signal,
} from '@angular/core';

import { environment } from '@environments/environment';

import { copy } from '@core/content';

import { Stop } from '@features/schedule/data-access/models/stop.model';
import { type WindDirection } from '@features/schedule/data-access/models/wind-direction.model';
import { TemperaturePipe } from '@shared/pipes/temperature.pipe';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

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
  public readonly copySchedule = copy('schedule');
  public stopData = input.required<Stop>();

  public readonly weatherIconUrl: Signal<string> = computed((): string => {
    const weather = this.stopData().weather;
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

  public readonly windDegNorm: Signal<number> = computed((): number => {
    const w = this.stopData().weather;
    const deg = w?.windDeg ?? 0;
    return ((deg % 360) + 360) % 360;
  });

  public readonly windDirLabel: Signal<WindDirection> = computed(
    (): WindDirection => {
      const deg = this.windDegNorm();
      return this.windDirs[Math.round(deg / 45) % 8];
    },
  );

  public readonly windArrowTransform: Signal<string> = computed(
    () => `rotate(${this.windDegNorm()}deg)`,
  );

  public readonly hasWindGust: Signal<boolean> = computed(() => {
    const w = this.stopData().weather;
    if (!w) return false;
    return w.windGust > w.windSpeed + 0.5;
  });

  public readonly windGustDelta: Signal<number> = computed(() => {
    const w = this.stopData().weather;
    if (!w) return 0;
    return Math.max(0, w.windGust - w.windSpeed);
  });
}
