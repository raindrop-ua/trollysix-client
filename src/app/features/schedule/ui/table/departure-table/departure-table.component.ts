import { AsyncPipe } from '@angular/common';
import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { SpinnerComponent } from '@app/shared/ui';
import { DepartureTimeItemComponent } from '@features/schedule/ui/table/departure-time-item/departure-time-item.component';

import { selectScheduleViewModel } from '../../../data-access/store/schedule.selectors';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'trollysix-departure-table',
  templateUrl: './departure-table.component.html',
  imports: [DepartureTimeItemComponent, AsyncPipe, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
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
