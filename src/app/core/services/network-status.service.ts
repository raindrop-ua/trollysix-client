import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Injectable,
  inject,
  signal,
  computed,
} from '@angular/core';
import { fromEvent, merge, map, pairwise, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class NetworkStatusService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);

  private readonly online = signal(true);
  public readonly isOnline = computed(() => this.online());

  private readonly minOfflineMs = 1_000;
  private wentOfflineAt: number | null = null;

  public init(): void {
    const defaultView = this.document.defaultView;

    if (!defaultView) {
      return;
    }

    const online$ = fromEvent(defaultView, 'online').pipe(map(() => true));

    const offline$ = fromEvent(defaultView, 'offline').pipe(map(() => false));

    const status$ = merge(online$, offline$).pipe(
      startWith(defaultView.navigator.onLine),
      tap((value) => this.online.set(value)),
      takeUntilDestroyed(this.destroyRef),
    );

    status$
      .pipe(
        pairwise(),
        tap(([prev, curr]) => {
          if (prev === curr) return;

          const now = Date.now();

          if (!curr) {
            this.wentOfflineAt = now;

            this.toastService.error('You are offline', {
              title: 'Connection lost',
            });

            return;
          }

          if (this.wentOfflineAt !== null) {
            const diff = now - this.wentOfflineAt;
            if (diff < this.minOfflineMs) {
              this.wentOfflineAt = null;
              return;
            }
          }

          this.toastService.success('Back online', {
            title: 'Connection restored',
          });

          this.wentOfflineAt = null;
        }),
      )
      .subscribe();
  }
}
