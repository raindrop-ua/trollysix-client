import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent {

}
