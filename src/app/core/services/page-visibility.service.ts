import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Service } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { fromEvent, filter, map, pairwise, tap, delay } from 'rxjs';

import { COPY } from '@core/content/en';

import { ToastService } from './toast.service';

@Service()
export class PageVisibilityService {
  private readonly copy = COPY.services.pageVisibility;
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);

  private lastHiddenAt: number | null = null;
  private readonly minAwayMs = 10_000;
  private initialized = false;

  public init(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    const visibility$ = fromEvent(this.document, 'visibilitychange').pipe(
      map(() => this.document.visibilityState),
      takeUntilDestroyed(this.destroyRef),
    );

    visibility$
      .pipe(
        pairwise(),
        filter(([prev, curr]) => prev === 'hidden' && curr === 'visible'),
        delay(500),
        tap(() => {
          const now = Date.now();

          if (this.lastHiddenAt !== null) {
            const diff = now - this.lastHiddenAt;
            if (diff < this.minAwayMs) {
              return;
            }
          }

          this.toastService.info(this.copy.niceToSeeYouAgain, {
            title: this.copy.welcomeBackTitle,
          });

          this.lastHiddenAt = null;
        }),
      )
      .subscribe();

    visibility$
      .pipe(
        filter((state) => state === 'hidden'),
        tap(() => {
          this.lastHiddenAt = Date.now();
        }),
      )
      .subscribe();
  }
}
