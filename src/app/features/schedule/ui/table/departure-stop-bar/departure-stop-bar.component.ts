import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { copy } from '@core/content';

import { ScheduleService } from '@features/schedule/application/services/schedule.service';
import { selectSelectedStopName } from '@features/schedule/data-access/store/schedule.selectors';

@Component({
  selector: 'trollysix-departure-stop-bar',
  imports: [],
  templateUrl: './departure-stop-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureStopBarComponent {
  readonly copySchedule = copy('schedule');
  private readonly store = inject(Store);
  private readonly schedule = inject(ScheduleService);
  readonly departures = toSignal(this.schedule.departures$, {
    initialValue: [],
  });
  readonly selectedStopName = this.store.selectSignal(selectSelectedStopName);
}
