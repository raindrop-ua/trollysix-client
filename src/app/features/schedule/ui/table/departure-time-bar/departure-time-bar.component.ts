import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SvgIconComponent } from '../../../../../shared/components/svg-icon/svg-icon.component';
import { ClockService } from '../../../../../core/services/clock.service';
import { Status } from '../../../data-access/models/departure.model';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-departure-time-bar',
  imports: [AsyncPipe, DatePipe, SvgIconComponent],
  templateUrl: './departure-time-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureTimeBarComponent {
  public clockService: ClockService = inject(ClockService);
  private readonly schedule = inject(ScheduleService);

  readonly departures$ = this.schedule.departures$;

  readonly next$ = this.departures$.pipe(
    map(
      (list) =>
        list.find((d) => d.status === Status.Now) ??
        list.find((d) => d.status !== Status.Past) ??
        null,
    ),
  );

  readonly label$ = combineLatest([this.next$, this.departures$]).pipe(
    map(([next, departures]) => {
      if (next?.time) return next.time;
      if (departures?.length) return 'Tomorrow';
      return 'No departures';
    }),
  );
}
