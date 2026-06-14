import { inject, ApplicationRef, Service } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

import { filter, first, map, switchMap } from 'rxjs/operators';

import { Observable, Subscription, of, race, timer } from 'rxjs';

interface NavigatorWithConnection extends Navigator {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
}

function appStableOnce(): Observable<void> {
  const appRef = inject(ApplicationRef);
  return appRef.isStable.pipe(
    filter(Boolean),
    first(),
    map(() => void 0),
  );
}

function afterFirstPaint(): Observable<void> {
  const fcp$ =
    typeof PerformanceObserver !== 'undefined'
      ? new Observable<void>((sub) => {
          let obs: PerformanceObserver | null = null;

          try {
            obs = new PerformanceObserver((list) => {
              const entry = list
                .getEntries()
                .find((e) => e.name === 'first-contentful-paint');
              if (entry) {
                obs?.disconnect();
                sub.next();
                sub.complete();
              }
            });
            obs.observe({ type: 'paint', buffered: true });
          } catch {
            sub.next();
            sub.complete();
          }

          return () => obs?.disconnect();
        })
      : of(void 0);

  return race(fcp$, timer(2000).pipe(map(() => void 0)));
}

function runInIdle(work: () => void): () => void {
  if (typeof requestIdleCallback !== 'undefined') {
    const id = requestIdleCallback(work, { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }

  const id = setTimeout(work, 0);
  return () => clearTimeout(id);
}

function canPreloadNow(): boolean {
  if (typeof navigator === 'undefined') {
    return true;
  }

  const nav = navigator as NavigatorWithConnection;
  if (nav?.connection?.saveData) return false;

  const type = nav?.connection?.effectiveType as string | undefined;
  return !(type && ['slow-2g', '2g'].includes(type));
}

@Service()
export class AfterFirstPaintPreloadingStrategy implements PreloadingStrategy {
  private ready$ = race(appStableOnce(), afterFirstPaint()).pipe(first());

  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    const mode = (route.data?.['preload'] ?? 'idle') as
      | 'eager'
      | 'idle'
      | false;

    if (mode === false) return of(null);

    return this.ready$.pipe(
      switchMap(() => {
        if (!canPreloadNow()) return of(null);
        if (mode === 'eager') return load();

        return new Observable<unknown>((sub) => {
          let innerSubscription: Subscription | null = null;
          const cancelIdle = runInIdle(() => {
            innerSubscription = load().subscribe({
              next: (v) => sub.next(v),
              error: (e) => sub.error(e),
              complete: () => sub.complete(),
            });
          });

          return () => {
            cancelIdle();
            innerSubscription?.unsubscribe();
          };
        });
      }),
    );
  }
}
