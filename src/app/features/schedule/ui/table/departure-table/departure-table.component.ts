import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { DepartureTimeItemComponent } from '../departure-time-item/departure-time-item.component';
import { ScheduleMockService } from '../../../services/schedule-mock.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectScheduleViewModel } from '../../../data-access/store/schedule.selectors';

@Component({
  selector: 'app-departure-table',
  templateUrl: './departure-table.component.html',
  imports: [DepartureTimeItemComponent, AsyncPipe, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureTableComponent {
  private readonly schedule = inject(ScheduleMockService);
  readonly departures$ = this.schedule.departures$;

  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);
}
