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
import { NoticeComponent } from '../../../shared/components/sections';
import { GenericHeaderComponent } from '../../../shared/components/sections/generic-header/generic-header.component';

@Component({
  selector: 'app-schedule',
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
  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);

  ngOnInit(): void {
    this.store.dispatch(SchedulePageActions.enter());
  }
}
