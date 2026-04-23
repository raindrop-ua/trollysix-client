import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { selectTimetableLoading } from '@features/schedule/data-access/store/schedule.selectors';
import { ScheduleService } from '@features/schedule/services/schedule.service';
import { DepartureTimeItemComponent } from '@features/schedule/ui/table/departure-time-item/departure-time-item.component';
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component';

@Component({
  selector: 'trollysix-departure-table',
  templateUrl: './departure-table.component.html',
  imports: [DepartureTimeItemComponent, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureTableComponent {
  private readonly schedule = inject(ScheduleService);
  readonly departures = toSignal(this.schedule.departures$, { initialValue: [] });
  private readonly store = inject(Store);
  readonly timetableLoading = this.store.selectSignal(selectTimetableLoading);
  private selectedTime = signal<string | null>(null);

  onSelectTime(time: string) {
    this.selectedTime.set(time);
  }
}
