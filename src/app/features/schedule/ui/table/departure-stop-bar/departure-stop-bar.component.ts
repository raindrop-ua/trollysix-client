import { AsyncPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { selectScheduleViewModel } from '../../../data-access/store/schedule.selectors';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'trollysix-departure-stop-bar',
  imports: [AsyncPipe],
  templateUrl: './departure-stop-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureStopBarComponent {
  private store = inject(Store);
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
  vm$ = this.store.select(selectScheduleViewModel);
}
