import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';

import { copy } from '@core/content';
import { ClockService } from '@core/services/clock.service';

import { ScheduleService } from '@features/schedule/application/services/schedule.service';
import {
  Departure,
  Status,
} from '@features/schedule/data-access/models/departure.model';
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
  private readonly schedule: ScheduleService = inject(ScheduleService);
  public readonly departures$: Observable<Departure[]> =
    this.schedule.departures$;
  private readonly store = inject(Store);
  public readonly timetableLoading$: Observable<boolean> = this.store.select(
    selectTimetableLoading,
  );

  public readonly next$: Observable<Departure | null> = this.departures$.pipe(
    map(
      (list) =>
        list.find((d) => d.status === Status.Now) ??
        list.find(
          (d) => d.status !== Status.Past && d.status !== Status.Canceled,
        ) ??
        null,
    ),
  );

  public readonly minutesToNext$: Observable<number | null> = combineLatest([
    this.next$,
    this.clockService.now$,
  ]).pipe(
    map(([next, now]) => {
      if (!next) return null;

      const diff = Math.floor(
        (next.departureAt.getTime() - now.getTime()) / 60000,
      );
      return diff >= 0 ? diff : null;
    }),
  );

  public readonly timeToNextLabel$: Observable<string | null> =
    this.minutesToNext$.pipe(
      map((minutes) => this.formatMinutesToNext(minutes)),
    );

  public readonly label$: Observable<string> = combineLatest([
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

  private formatMinutesToNext(minutes: number | null): string | null {
    if (minutes === null) return null;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const parts: string[] = [];

    if (hours > 0) {
      const hourLabel =
        hours === 1
          ? this.copySchedule.departureTimeBar.hour
          : this.copySchedule.departureTimeBar.hours;

      parts.push(`${hours} ${hourLabel}`);
    }

    if (remainingMinutes > 0 || hours === 0) {
      const minuteLabel =
        remainingMinutes === 1
          ? this.copySchedule.departureTimeBar.minute
          : this.copySchedule.departureTimeBar.minutes;

      parts.push(`${remainingMinutes} ${minuteLabel}`);
    }

    return parts.join(' ');
  }
}
