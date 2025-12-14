import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-departure-config',
  imports: [AsyncPipe],
  templateUrl: './departure-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureConfigComponent {
  private readonly schedule = inject(ScheduleService);

  readonly departures$ = this.schedule.departures$;
  readonly showScheduleNumbers$ = this.schedule.showScheduleNumbers$;

  onToggleSchedule(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.schedule.setShowScheduleNumbers(checked);
  }
}
