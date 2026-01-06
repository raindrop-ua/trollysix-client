import { AsyncPipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { copy } from '@core/content/copy.util';
import { ScheduleControlsComponent } from '@features/schedule/ui/schedule-controls/schedule-controls.component';
import { SelectorsGroupComponent } from '@features/schedule/ui/selectors-group/selectors-group.component';
import { StopDetailsComponent } from '@features/schedule/ui/stop-details/stop-details.component';
import { StopToolbarComponent } from '@features/schedule/ui/stop-toolbar/stop-toolbar.component';
import { StopsListComponent } from '@features/schedule/ui/stops-list/stops-list.component';
import { NoticeComponent } from '@shared/ui/sections';
import { GenericHeaderComponent } from '@shared/ui/sections/generic-header/generic-header.component';

import { SchedulePageActions } from '../data-access/store/schedule.actions';
import { selectScheduleViewModel } from '../data-access/store/schedule.selectors';

@Component({
  selector: 'trollysix-schedule',
  imports: [
    GenericHeaderComponent,
    ScheduleControlsComponent,
    NoticeComponent,
    SelectorsGroupComponent,
    StopsListComponent,
    StopDetailsComponent,
    StopToolbarComponent,
    AsyncPipe,
  ],
  templateUrl: './schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ScheduleComponent implements OnInit {
  readonly copySchedule = copy('schedule');

  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);

  ngOnInit(): void {
    this.store.dispatch(SchedulePageActions.enter());
  }
}
