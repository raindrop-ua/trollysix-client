import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { copy } from '@app/core/content/copy.util';
import { ClockService } from '@app/core/services/clock.service';
import { SvgIconComponent } from '@app/shared/ui';

import { Status } from '../../../data-access/models/departure.model';
import { selectScheduleViewModel } from '../../../data-access/store/schedule.selectors';
import { ScheduleService } from '../../../services/schedule.service';

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
