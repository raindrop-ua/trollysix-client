import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  DepartureTableComponent,
  DepartureLegendComponent,
  DepartureTimeBarComponent,
  DepartureStopBarComponent,
} from '../table';
import { DepartureConfigComponent } from '../table/departure-config/departure-config.component';

@Component({
  selector: 'app-schedule-controls',
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
