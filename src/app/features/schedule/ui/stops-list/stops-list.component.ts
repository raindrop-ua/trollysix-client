import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';

@Component({
  selector: 'app-stops-list',
  imports: [SvgIconComponent, AsyncPipe],
  templateUrl: './stops-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopsListComponent {
  public readonly showDescriptions = input<boolean>(true);

  private store = inject(Store);
  vm$ = this.store.select(selectScheduleViewModel);

  onSelectStop(stopId: string): void {
    this.store.dispatch(SchedulePageActions.selectStop({ stopId }));
  }
}
