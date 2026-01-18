import { AsyncPipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { ScheduleService } from '@features/schedule/services/schedule.service';
import { TooltipDirective } from '@shared/directives/tooltip.directive';

@Component({
  selector: 'trollysix-departure-legend',
  imports: [AsyncPipe, TooltipDirective],
  templateUrl: './departure-legend.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartureLegendComponent {
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
}
