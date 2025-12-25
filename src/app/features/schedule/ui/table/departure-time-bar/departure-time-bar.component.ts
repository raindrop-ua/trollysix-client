import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectScheduleViewModel } from '../../../data-access/store/schedule.selectors';
import { Status } from '../../../data-access/models/departure.model';
import { ClockService } from '../../../../../core/services/clock.service';
import { ScheduleService } from '../../../services/schedule.service';
import { SvgIconComponent } from '../../../../../shared/ui';

@Component({
  selector: 'app-departure-time-bar',
  imports: [AsyncPipe, DatePipe, SvgIconComponent],
  templateUrl: './departure-time-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class DepartureTimeBarComponent {
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
      return 'No departures';
    }),
  );
}
