import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectScheduleViewModel } from '../../../data-access/store/schedule.selectors';
import { ScheduleService } from '../../../services/schedule.service';
import { DepartureTimeItemComponent } from '../departure-time-item/departure-time-item.component';
import { SpinnerComponent } from '../../../../../shared/components/sections';

@Component({
  selector: 'app-departure-table',
  templateUrl: './departure-table.component.html',
  imports: [DepartureTimeItemComponent, AsyncPipe, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DepartureTableComponent {
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);
  private selectedTime = signal<string | null>(null);

  onSelectTime(time: string) {
    this.selectedTime.set(time);
  }
}
