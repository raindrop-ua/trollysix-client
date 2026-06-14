import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Service } from '@angular/core';

import {
  interval,
  map,
  shareReplay,
  startWith,
  switchMap,
  timer,
  of,
} from 'rxjs';

function msToNextMinute(d = new Date()): number {
  return 60_000 - (d.getSeconds() * 1000 + d.getMilliseconds());
}

@Service()
export class ClockService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly timeUpdateTicks$ = isPlatformBrowser(this.platformId)
    ? timer(msToNextMinute()).pipe(
        switchMap(() => interval(5_000)),
        startWith(0),
      )
    : of(0);

  public readonly now$ = this.timeUpdateTicks$.pipe(
    map(() => new Date()),
    shareReplay({ bufferSize: 1, refCount: false }),
  );
}
