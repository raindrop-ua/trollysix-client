import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-departure-legend',
  imports: [AsyncPipe],
  templateUrl: './departure-legend.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureLegendComponent {
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
}
