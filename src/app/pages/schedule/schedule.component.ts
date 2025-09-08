import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  ScheduleControlsComponent
} from "../../features/schedule/components/schedule-controls/schedule-controls.component";
import {StopDetailsComponent} from "../../features/schedule/components/stop-details/stop-details.component";
import {NoticeComponent} from "../../shared/components/notice/notice.component";
import {SelectorsGroupComponent} from "../../features/schedule/components/selectors-group/selectors-group.component";
import {StopDetails} from "../../features/schedule/components/stop-details/stop-details.model";

@Component({
  selector: 'app-schedule',
  imports: [
    ScheduleControlsComponent,
    StopDetailsComponent,
    NoticeComponent,
    SelectorsGroupComponent,
  ],
  templateUrl: './schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
  stopData: StopDetails = {
    name: 'Pridniprovsk',
    description: '',
    imageUrl: 'assets/images/pridniprovsk-stop.webp',
    sharedRoutes: ['1', '4', '9', '16', '21', 'B'],
    geo: {
      lat: 48.388001,
      lon: 35.094,
    },
    weather: {
      temperature: 23,
      description: 'light breeze',
      icon: '',
    }
  }
}
