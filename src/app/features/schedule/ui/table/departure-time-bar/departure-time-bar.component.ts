import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { copy } from '@core/content';
import { ClockService } from '@core/services/clock.service';

import { ScheduleService } from '@features/schedule/application/services/schedule.service';
import { Status } from '@features/schedule/data-access/models/departure.model';
import { selectTimetableLoading } from '@features/schedule/data-access/store/schedule.selectors';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-departure-time-bar',
  imports: [AsyncPipe, DatePipe, SvgIconComponent],
  templateUrl: './departure-time-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureTimeBarComponent {
  public readonly copySchedule = copy('schedule');

  public clockService: ClockService = inject(ClockService);
  private readonly schedule = inject(ScheduleService);
  public readonly departures$ = this.schedule.departures$;
  private readonly store = inject(Store);
  public readonly timetableLoading$ = this.store.select(selectTimetableLoading);

  public readonly next$ = this.departures$.pipe(
    map(
      (list) =>
        list.find((d) => d.status === Status.Now) ??
        list.find(
          (d) => d.status !== Status.Past && d.status !== Status.Canceled,
        ) ??
        null,
    ),
  );

  public readonly minutesToNext$ = combineLatest([
    this.next$,
    this.clockService.now$,
  ]).pipe(
    map(([next, now]) => {
      if (!next?.time) return null;

      const [hours, minutes] = next.time.split(':').map(Number);
      const departure = new Date(now);
      departure.setHours(hours, minutes, 0, 0);

      const diff = Math.floor((departure.getTime() - now.getTime()) / 60000);
      return diff >= 0 ? diff : null;
    }),
  );

  public readonly label$ = combineLatest([
    this.next$,
    this.departures$,
    this.timetableLoading$,
  ]).pipe(
    map(([next, departures, timetableLoading]) => {
      if (timetableLoading) return this.copySchedule.departureTimeBar.loading;
      if (next?.time) return next.time;
      if (departures?.length)
        return this.copySchedule.departureTimeBar.tomorrow;
      return this.copySchedule.noDepartures;
    }),
  );
}
