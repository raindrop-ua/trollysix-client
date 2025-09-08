import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { interval, map, shareReplay, startWith, switchMap, timer, of } from 'rxjs';

function msToNextMinute(d = new Date()): number {
  return 60_000 - (d.getSeconds() * 1000 + d.getMilliseconds());
}

@Injectable({ providedIn: 'root' })
export class ClockService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly timeUpdateTicks$ = isPlatformBrowser(this.platformId)
    ? timer(msToNextMinute()).pipe(
      switchMap(() => interval(5_000)),
      startWith(0)
    )
    : of(0);

  readonly now$ = this.timeUpdateTicks$.pipe(
    map(() => new Date()),
    shareReplay({ bufferSize: 1, refCount: false })
  );
}
