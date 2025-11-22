import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { OptionsSelectorComponent } from '../options-selector/options-selector.component';
import { StopsListComponent } from '../stops-list/stops-list.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-selectors-group',
  imports: [
    OptionsSelectorComponent,
    StopsListComponent,
    SvgIconComponent,
    AsyncPipe,
  ],
  templateUrl: './selectors-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectorsGroupComponent {
  private store = inject(Store);

  vm$ = this.store.select(selectScheduleViewModel);

  onSelectDayType(dayTypeName: string): void {
    this.store.dispatch(SchedulePageActions.selectDayType({ dayTypeName }));
  }

  onSelectDirection(directionName: string): void {
    this.store.dispatch(SchedulePageActions.selectDirection({ directionName }));
  }
}
