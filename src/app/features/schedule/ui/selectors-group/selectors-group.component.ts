import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { OptionsSelectorComponent } from '../options-selector/options-selector.component';
import { StopsListComponent } from '../stops-list/stops-list.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';

@Component({
  selector: 'app-selectors-group',
  imports: [OptionsSelectorComponent, StopsListComponent, SvgIconComponent],
  templateUrl: './selectors-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorsGroupComponent {
  private store = inject(Store);

  onSelectDayType(dayTypeName: string): void {
    this.store.dispatch(SchedulePageActions.selectDayType({ dayTypeName }));
  }

  onSelectDirection(directionName: string): void {
    this.store.dispatch(SchedulePageActions.selectDirection({ directionName }));
  }
}
