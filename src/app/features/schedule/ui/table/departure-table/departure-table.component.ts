import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { DepartureTimeItemComponent } from '../departure-time-item/departure-time-item.component';
import { ScheduleService } from '../../../services/schedule.service';
import { selectScheduleViewModel } from '../../../data-access/store/schedule.selectors';

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
  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);
}
