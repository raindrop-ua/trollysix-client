import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  combineLatest,
  map,
  shareReplay,
  distinctUntilChanged,
  Observable,
} from 'rxjs';

import { ClockService } from '@core/services/clock.service';

import { Departure, Status } from '../../data-access/models/departure.model';
import { TimeEntity } from '../../data-access/models/timetable.model';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';
import { scheduleFeature } from '../../data-access/store/schedule.reducer';
import { selectCurrentTimetableTimes } from '../../data-access/store/schedule.selectors';

import { ScheduleTimeService } from './schedule-time.service';

@Injectable()
export class ScheduleService {
  private readonly clock = inject(ClockService);
  private readonly scheduleTime = inject(ScheduleTimeService);
  private readonly store = inject(Store);

  private readonly times$ = this.store.select(selectCurrentTimetableTimes).pipe(
    distinctUntilChanged((a, b) => this.timeArraysEqual(a, b)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public readonly departures$: Observable<Departure[]> = combineLatest([
    this.clock.now$,
    this.times$,
  ]).pipe(
    map(([now, times]) =>
      times.map<Departure>((t) => {
        const { departureAt, time } = this.scheduleTime.resolve(t.time, now);

        return {
          departureAt,
          time,
          runNumber: t.runNumber,
          status: t.isCanceled
            ? Status.Canceled
            : this.statusFor(now, departureAt),
        };
      }),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public readonly showRunNumbers$: Observable<boolean> = this.store.select(
    scheduleFeature.selectShowRunNumbers,
  );

  public setShowRunNumbers(show: boolean): void {
    this.store.dispatch(SchedulePageActions.setShowRunNumbers({ show }));
  }

  private timeArraysEqual(a: TimeEntity[], b: TimeEntity[]): boolean {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      const ai = a[i];
      const bi = b[i];
      if (ai.time !== bi.time || ai.runNumber !== bi.runNumber) {
        return false;
      }
    }
    return true;
  }

  private statusFor(now: Date, dep: Date): Status {
    const diffMinutes = Math.floor((dep.getTime() - now.getTime()) / 60000);
    if (diffMinutes < 0) return Status.Past;
    if (diffMinutes <= 5) return Status.Now;
    if (diffMinutes <= 15) return Status.Soon;
    return Status.Coming;
  }
}
