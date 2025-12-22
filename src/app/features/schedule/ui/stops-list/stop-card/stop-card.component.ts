import {
  Component,
  input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Stop } from '../../../data-access/models/stop.model';
import { DirectionName } from '../../../data-access/models/direction.model';
import { SchedulePageActions } from '../../../data-access/store/schedule.actions';
import { selectScheduleViewModel } from '../../../data-access/store/schedule.selectors';
import { SvgIconComponent } from '../../../../../shared/components';

@Component({
  selector: 'app-stop-card',
  imports: [SvgIconComponent, AsyncPipe, NgOptimizedImage],
  templateUrl: './stop-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopCardComponent {
  private store = inject(Store);
  public readonly showDescriptions = input<boolean>(false);
  public readonly showDepartures = input<boolean>(true);
  public readonly showBackgroundImage = input<boolean>(false);
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
