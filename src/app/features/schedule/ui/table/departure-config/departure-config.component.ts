import { AsyncPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content';

import { ScheduleService } from '@features/schedule/application/services/schedule.service';

@Component({
  selector: 'trollysix-departure-config',
  imports: [AsyncPipe],
  templateUrl: './departure-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureConfigComponent {
  public readonly copySchedule = copy('schedule');
  private readonly schedule = inject(ScheduleService);
  public readonly departures$ = this.schedule.departures$;
  public readonly showRunNumbers$ = this.schedule.showRunNumbers$;

  public onToggleSchedule(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.schedule.setShowRunNumbers(checked);
  }
}
