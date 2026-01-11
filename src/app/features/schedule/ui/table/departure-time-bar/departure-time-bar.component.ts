import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { copy } from '@core/content/copy.util';
import { ClockService } from '@core/services/clock.service';

import { Status } from '@features/schedule/data-access/models/departure.model';
import { selectScheduleViewModel } from '@features/schedule/data-access/store/schedule.selectors';
import { ScheduleService } from '@features/schedule/services/schedule.service';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-departure-time-bar',
  imports: [AsyncPipe, DatePipe, SvgIconComponent],
  templateUrl: './departure-time-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureTimeBarComponent {
  readonly copySchedule = copy('schedule');

  public clockService: ClockService = inject(ClockService);
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
  private store = inject(Store);

  vm$ = this.store.select(selectScheduleViewModel);

  readonly next$ = this.departures$.pipe(
    map(
      (list) =>
        list.find((d) => d.status === Status.Now) ??
        list.find((d) => d.status !== Status.Past) ??
        null,
    ),
  );

  readonly label$ = combineLatest([
    this.next$,
    this.departures$,
    this.vm$,
  ]).pipe(
    map(([next, departures, vm]) => {
      if (vm.timetableLoading) return 'Loading...';
      if (next?.time) return next.time;
      if (departures?.length) return 'Tomorrow';
      return this.copySchedule.noDepartures;
    }),
  );
}
