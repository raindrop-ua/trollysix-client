import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, shareReplay, distinctUntilChanged } from 'rxjs';
import { ClockService } from '../../../core/services/clock.service';
import { Departure, Status } from '../data-access/models/departure.model';
import { selectScheduleViewModel } from '../data-access/store/schedule.selectors';
import { scheduleFeature } from '../data-access/store/schedule.reducer';
import { SchedulePageActions } from '../data-access/store/schedule.actions';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private readonly clock = inject(ClockService);
  private readonly store = inject(Store);

  private readonly times$ = this.store.select(selectScheduleViewModel).pipe(
    map((vm) => vm.currentTimetable?.times ?? ([] as string[])),
    distinctUntilChanged((a, b) => this.arraysEqual(a, b)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly departures$ = combineLatest([this.clock.now$, this.times$]).pipe(
    map(([now, times]) =>
      times.map<Departure>((t) => ({
        time: t,
        status: this.statusFor(now, this.toTodayDate(t, now)),
      })),
    ),
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  readonly showScheduleNumbers$ = this.store.select(
    scheduleFeature.selectShowScheduleNumbers,
  );

  setShowScheduleNumbers(show: boolean) {
    this.store.dispatch(
      SchedulePageActions.setShowScheduleNumbers({ show }),
    );
  }

  private arraysEqual(a: string[], b: string[]) {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
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
    if (diffMinutes <= 20) return Status.Soon;
    return Status.Coming;
  }
}
