import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  DepartureTableComponent,
  DepartureLegendComponent,
  DepartureTimeBarComponent,
  DepartureStopBarComponent,
} from '../table';

@Component({
  selector: 'app-schedule-controls',
  imports: [
    DepartureTableComponent,
    DepartureLegendComponent,
    DepartureTimeBarComponent,
    DepartureStopBarComponent,
  ],
  templateUrl: './schedule-controls.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent {}
