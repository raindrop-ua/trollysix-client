import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { DepartureTimeItemComponent } from '../departure-time-item/departure-time-item.component';
import { ScheduleMockService } from '../../../services/schedule-mock.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-departure-table',
  templateUrl: './departure-table.component.html',
  imports: [DepartureTimeItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureTableComponent {
  private readonly schedule = inject(ScheduleMockService);
  readonly departures$ = this.schedule.departures$;
}
