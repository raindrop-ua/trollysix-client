import {
  Component,
  input,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { SchedulePageActions } from '../../../data-access/store/schedule.actions';
import { selectScheduleViewModel } from '../../../data-access/store/schedule.selectors';
import { Stop } from '../../../data-access/models/stop.model';
import { DirectionName } from '../../../data-access/models/direction.model';
import { SvgIconComponent } from '../../../../../shared/ui';
import { copy } from '../../../../../core/content/copy.util';

@Component({
  selector: 'app-stop-card',
  imports: [SvgIconComponent, AsyncPipe, NgOptimizedImage],
  templateUrl: './stop-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class StopCardComponent {
  readonly copySchedule = copy('schedule');

  private store = inject(Store);

  public readonly showDescriptions = input.required<boolean>();
  public readonly showBackgroundImage = input.required<boolean>();

  public selected = input<boolean>(false);
  public stopData = input<Stop>();

  public vm$ = this.store.select(selectScheduleViewModel);

  public getDeparture(stop: Stop, direction: DirectionName | null) {
    if (!direction) return null;
    return stop.departures?.[direction];
  }

  public onSelectStop(stopId: string, isSelected: boolean): void {
    if (isSelected) {
      return;
    }
    this.store.dispatch(SchedulePageActions.selectStop({ stopId }));
  }
}
