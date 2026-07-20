import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { catchError, defer, expand, map, of, switchMap, timer } from 'rxjs';

import { VehiclesTrackingResponse } from '../../data-access/models/vehicles-tracking.model';
import { VehiclesTrackingApiService } from '../../data-access/services/vehicles-tracking-api.service';

const FALLBACK_POLL_INTERVAL_MS = 15_000;

export type VehiclesTrackingState =
  | { readonly status: 'loading' }
  | { readonly status: 'error' }
  | { readonly status: 'ready'; readonly response: VehiclesTrackingResponse };

interface PollResult {
  readonly state: VehiclesTrackingState;
  readonly nextPollInMs: number;
}

@Injectable()
export class VehiclesTrackingService {
  private readonly api = inject(VehiclesTrackingApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly stateSignal = signal<VehiclesTrackingState>({
    status: 'loading',
  });

  public readonly state = this.stateSignal.asReadonly();

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    defer(() => this.request()).pipe(
      expand((result) =>
        timer(result.nextPollInMs).pipe(switchMap(() => this.request())),
      ),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((result) => this.stateSignal.set(result.state));
  }

  private request() {
    return this.api.getVehicles().pipe(
      map((response): PollResult => ({
        state: { status: 'ready', response },
        nextPollInMs: this.getPollInterval(response.nextUpdateExpectedInMs),
      })),
      catchError(() =>
        of<PollResult>({
          state: { status: 'error' },
          nextPollInMs: FALLBACK_POLL_INTERVAL_MS,
        }),
      ),
    );
  }

  private getPollInterval(nextUpdateExpectedInMs: number): number {
    return Math.max(FALLBACK_POLL_INTERVAL_MS, nextUpdateExpectedInMs);
  }
}
