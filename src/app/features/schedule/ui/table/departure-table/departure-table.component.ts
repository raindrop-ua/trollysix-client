import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DepartureTimeItemComponent } from '../departure-time-item/departure-time-item.component';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-departure-table',
  templateUrl: './departure-table.component.html',
  imports: [DepartureTimeItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureTableComponent {
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
}
