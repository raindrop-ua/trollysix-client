import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OptionsSelectorComponent } from '../options-selector/options-selector.component';
import { StopsSelectComponent } from '../stops-select/stops-select.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { Store } from '@ngrx/store';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';

@Component({
  selector: 'app-selectors-group',
  imports: [OptionsSelectorComponent, StopsSelectComponent, SvgIconComponent],
  templateUrl: './selectors-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorsGroupComponent {
  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);

  onSelectDayType(dayTypeName: string): void {
    console.log(dayTypeName);
    this.store.dispatch(SchedulePageActions.selectDayType({ dayTypeName }));
  }

  onSelectDirection(directionName: string): void {
    this.store.dispatch(SchedulePageActions.selectDirection({ directionName }));
  }
}
