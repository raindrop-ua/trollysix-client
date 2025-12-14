import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ScheduleService } from '../../../services/schedule.service';

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
