import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { ScheduleService } from '../../services/schedule.service';
import { OptionsSelectorComponent } from '../options-selector/options-selector.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { HintArrowComponent } from '../hint-arrow/hint-arrow.component';

@Component({
  selector: 'app-selectors-group',
  imports: [
    OptionsSelectorComponent,
    SvgIconComponent,
    AsyncPipe,
    HintArrowComponent,
    NgClass,
  ],
  templateUrl: './selectors-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectorsGroupComponent {
  private store = inject(Store);
  private readonly schedule = inject(ScheduleService);
  readonly departures$ = this.schedule.departures$;
  vm$ = this.store.select(selectScheduleViewModel);

  onSelectDayType(dayTypeName: string): void {
    this.store.dispatch(SchedulePageActions.selectDayType({ dayTypeName }));
  }

  onSelectDirection(directionName: string): void {
    if (directionName !== 'forward' && directionName !== 'backward') {
      return;
    }
    this.store.dispatch(SchedulePageActions.selectDirection({ directionName }));
  }
}
