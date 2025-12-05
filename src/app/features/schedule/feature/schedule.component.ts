import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  ScheduleControlsComponent,
  SelectorsGroupComponent,
  StopDetailsComponent,
  StopsListComponent,
  FindGeoStopComponent,
} from '../ui';
import { NoticeComponent } from '../../../shared/components/sections';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';
import { selectScheduleViewModel } from '../data-access/store/schedule.selectors';
import { SchedulePageActions } from '../data-access/store/schedule.actions';

@Component({
  selector: 'app-schedule',
  imports: [
    ScheduleControlsComponent,
    NoticeComponent,
    SelectorsGroupComponent,
    StopsListComponent,
    StopDetailsComponent,
    AsyncPipe,
    RevealOnScrollDirective,
    FindGeoStopComponent,
  ],
  templateUrl: './schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ScheduleComponent implements OnInit {
  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);

  ngOnInit(): void {
    this.store.dispatch(SchedulePageActions.enter());
  }
}
