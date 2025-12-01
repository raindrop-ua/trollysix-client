import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
})
export class ScheduleControlsComponent {}
