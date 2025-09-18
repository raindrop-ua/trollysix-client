import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  ScheduleControlsComponent,
  SelectorsGroupComponent,
  StopDetailsComponent,
} from '../ui';
import { NoticeComponent } from '../../../shared/components/sections';
import { Store } from '@ngrx/store';
import { selectScheduleViewModel } from '../data-access/store/schedule.selectors';
import { SchedulePageActions } from '../data-access/store/schedule.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-schedule',
  imports: [
    ScheduleControlsComponent,
    StopDetailsComponent,
    NoticeComponent,
    SelectorsGroupComponent,
    AsyncPipe,
  ],
  templateUrl: './schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit {
  // stopData: StopDetails = {
  //   name: 'Pridniprovsk',
  //   description: '',
  //   imageUrl: 'assets/images/pridniprovsk-stop.webp',
  //   sharedRoutes: ['1', '4', '9', '16', '21', 'B'],
  //   geo: {
  //     lat: 48.388001,
  //     lon: 35.094,
  //   },
  //   weather: {
  //     temperature: 23,
  //     description: 'light breeze',
  //     icon: '',
  //   },
  // };

  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);

  ngOnInit(): void {
    this.vm$.subscribe((data) => {
      console.log(data);
    })
    this.store.dispatch(SchedulePageActions.enter());
  }
}
