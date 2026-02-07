import { AsyncPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { ScheduleService } from '@features/schedule/services/schedule.service';

@Component({
  selector: 'trollysix-departure-config',
  imports: [AsyncPipe],
  templateUrl: './departure-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureConfigComponent {
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
  readonly showRunNumbers$ = this.schedule.showRunNumbers$;

  onToggleSchedule(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.schedule.setShowRunNumbers(checked);
  }
}
