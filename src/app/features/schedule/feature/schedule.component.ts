import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StopDetails } from '../data-access/models/stop-details.model';
import {
  ScheduleControlsComponent,
  SelectorsGroupComponent,
  StopDetailsComponent,
} from '../ui';
import { NoticeComponent } from '../../../shared/components/sections';

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
    },
  };
}
