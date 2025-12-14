import {
  Component,
  input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Stop } from '../../data-access/models/stop.model';
import { DirectionName } from '../../data-access/models/direction.model';
import { SchedulePageActions } from '../../data-access/store/schedule.actions';
import { selectScheduleViewModel } from '../../data-access/store/schedule.selectors';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-stop-card',
  imports: [SvgIconComponent, AsyncPipe],
  templateUrl: './stop-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopCardComponent {
  private store = inject(Store);
  public readonly showDescriptions = input<boolean>(false);
  public readonly showDepartures = input<boolean>(true);
  public selected = input<boolean>(false);
  public stopData = input<Stop>();

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
