import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { fromEvent, filter, map, pairwise, tap, delay } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class PageVisibilityService {
  private readonly document = inject(DOCUMENT);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  private lastHiddenAt: number | null = null;
  private readonly minAwayMs = 10_000;

  public init(): void {
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

          this.toastService.info('Nice to see you again', {
            title: 'Welcome back 👋',
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
