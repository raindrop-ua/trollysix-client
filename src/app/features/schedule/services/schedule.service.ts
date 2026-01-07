import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { combineLatest, map, shareReplay, distinctUntilChanged } from 'rxjs';

import { ClockService } from '@core/services/clock.service';

import { Departure, Status } from '../data-access/models/departure.model';
import { TimeEntity } from '../data-access/models/timetable.model';
import { SchedulePageActions } from '../data-access/store/schedule.actions';
import { scheduleFeature } from '../data-access/store/schedule.reducer';
import { selectScheduleViewModel } from '../data-access/store/schedule.selectors';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private readonly clock = inject(ClockService);
  private readonly store = inject(Store);

  private readonly times$ = this.store.select(selectScheduleViewModel).pipe(
    map((vm) => vm.currentTimetable?.times ?? ([] as TimeEntity[])),
    distinctUntilChanged((a, b) => this.timeArraysEqual(a, b)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public readonly departures$ = combineLatest([
    this.clock.now$,
    this.times$,
  ]).pipe(
    map(([now, times]) =>
      times.map<Departure>((t) => ({
        time: t.time,
        scheduleNumber: t.scheduleNumber,
        status: this.statusFor(now, this.toTodayDate(t.time, now)),
      })),
    ),
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  public readonly showScheduleNumbers$ = this.store.select(
    scheduleFeature.selectShowScheduleNumbers,
  );

  public setShowScheduleNumbers(show: boolean) {
    this.store.dispatch(SchedulePageActions.setShowScheduleNumbers({ show }));
  }

  private timeArraysEqual(a: TimeEntity[], b: TimeEntity[]) {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      const ai = a[i];
      const bi = b[i];
      if (ai.time !== bi.time || ai.scheduleNumber !== bi.scheduleNumber) {
        return false;
      }
    }
    return true;
  }

  private toTodayDate(hhmm: string, now: Date): Date {
    const [h, m] = hhmm.split(':').map(Number);
    const d = new Date(now);
    d.setHours(h, m, 0, 0);
    return d;
  }

  private statusFor(now: Date, dep: Date): Status {
    const diffMinutes = Math.floor((dep.getTime() - now.getTime()) / 60000);
    if (diffMinutes < 0) return Status.Past;
    if (diffMinutes <= 5) return Status.Now;
    if (diffMinutes <= 15) return Status.Soon;
    return Status.Coming;
  }
}
