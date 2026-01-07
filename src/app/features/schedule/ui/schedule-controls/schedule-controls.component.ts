import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DepartureLegendComponent } from '@features/schedule/ui/table/departure-legend/departure-legend.component';
import { DepartureStopBarComponent } from '@features/schedule/ui/table/departure-stop-bar/departure-stop-bar.component';
import { DepartureTableComponent } from '@features/schedule/ui/table/departure-table/departure-table.component';
import { DepartureTimeBarComponent } from '@features/schedule/ui/table/departure-time-bar/departure-time-bar.component';

import { DepartureConfigComponent } from '../table/departure-config/departure-config.component';

@Component({
  selector: 'trollysix-schedule-controls',
  imports: [
    DepartureTableComponent,
    DepartureLegendComponent,
    DepartureTimeBarComponent,
    DepartureStopBarComponent,
    DepartureConfigComponent,
  ],
  templateUrl: './schedule-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ScheduleControlsComponent {}
