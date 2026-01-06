import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  ScheduleControlsComponent,
  SelectorsGroupComponent,
  StopDetailsComponent,
  StopsListComponent,
  StopToolbarComponent,
} from '../ui';
import { selectScheduleViewModel } from '../data-access/store/schedule.selectors';
import { SchedulePageActions } from '../data-access/store/schedule.actions';
import { NoticeComponent } from '../../../shared/ui/sections';
import { GenericHeaderComponent } from '../../../shared/ui/sections/generic-header/generic-header.component';
import { copy } from '../../../core/content/copy.util';

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
