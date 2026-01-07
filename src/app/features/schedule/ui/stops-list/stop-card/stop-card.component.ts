import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  Component,
  input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { copy } from '@app/core/content/copy.util';
import { DirectionName } from '@features/schedule/data-access/models/direction.model';
import { Stop } from '@features/schedule/data-access/models/stop.model';
import { SchedulePageActions } from '@features/schedule/data-access/store/schedule.actions';
import { selectScheduleViewModel } from '@features/schedule/data-access/store/schedule.selectors';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-stop-card',
  imports: [SvgIconComponent, AsyncPipe, NgOptimizedImage],
  templateUrl: './stop-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
