import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';

import { DirectionName } from '../../data-access/models/direction.model';
import { Weather } from '../../data-access/models/weather.model';
import { WeatherApiService } from '../../data-access/services/weather-api.service';
import { scheduleFeature } from '../../data-access/store/schedule.reducer';

const WEATHER_POLL_INTERVAL_MS = 15 * 60 * 1000;

export type WeatherState =
  | { readonly status: 'loading' }
  | { readonly status: 'error' }
  | { readonly status: 'ready'; readonly weather: Weather };

interface WeatherSelection {
  readonly stopId: string;
  readonly direction: DirectionName;
}

@Injectable()
export class WeatherService {
  private readonly api = inject(WeatherApiService);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly stateSignal = signal<WeatherState>({ status: 'loading' });

  public readonly state = this.stateSignal.asReadonly();

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    combineLatest([
      this.store.select(scheduleFeature.selectSelectedStopId),
      this.store.select(scheduleFeature.selectSelectedDirectionName),
    ])
      .pipe(
        filter(
          (selection): selection is [string, DirectionName] =>
            selection[0] !== null && selection[1] !== null,
        ),
        map(([stopId, direction]): WeatherSelection => ({ stopId, direction })),
        distinctUntilChanged(
          (previous, current) =>
            previous.stopId === current.stopId &&
            previous.direction === current.direction,
        ),
        tap(() => this.stateSignal.set({ status: 'loading' })),
        switchMap(({ stopId, direction }) =>
          timer(0, WEATHER_POLL_INTERVAL_MS).pipe(
            switchMap(() =>
              this.api.getWeather(stopId, direction).pipe(
                map((weather): WeatherState => ({ status: 'ready', weather })),
                catchError(() => of<WeatherState>({ status: 'error' })),
              ),
            ),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((state) => this.stateSignal.set(state));
  }
}
