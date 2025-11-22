import {
  Component,
  inject,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';
import { Stop } from '../../data-access/models/stop.model';
import { DirectionName } from '../../data-access/models/direction.model';

@Component({
  selector: 'app-stops-list',
  imports: [SvgIconComponent, AsyncPipe, DatePipe],
  templateUrl: './stops-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StopsListComponent {
  public readonly showDescriptions = input<boolean>(true);
  public readonly showDepartures = input<boolean>(true);
  private store = inject(Store);

  vm$ = this.store.select(selectScheduleViewModel);

  getDeparture(stop: Stop, direction: DirectionName | null) {
    if (!direction) return null;
    return stop.departures?.[direction];
  }

  onSelectStop(stopId: string, isSelected: boolean): void {
    if (isSelected) {
      return;
    }
    this.store.dispatch(SchedulePageActions.selectStop({ stopId }));
  }
}
