import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { copy } from '@core/content';

import { DayTypeName } from '@features/schedule/data-access/models/daytype.model';
import { DirectionName } from '@features/schedule/data-access/models/direction.model';
import { DepartureBound } from '@features/schedule/data-access/models/stop.model';
import { Stop } from '@features/schedule/data-access/models/stop.model';
import { SchedulePageActions } from '@features/schedule/data-access/store/schedule.actions';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-stop-card',
  imports: [SvgIconComponent],
  templateUrl: './stop-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopCardComponent {
  readonly copySchedule = copy('schedule');

  private store = inject(Store);

  public readonly selected = input(false);
  public readonly stopData = input.required<Stop>();
  public readonly selectedDirectionName = input<DirectionName | null>(null);
  public readonly selectedDayTypeName = input<string | null>(null);

  public getDeparture(
    stop: Stop,
    direction: DirectionName | null,
    dayTypeName: string | null,
  ): DepartureBound | null {
    if (!direction) return null;

    const departures = stop.departures as Record<string, unknown>;

    const byDirection = departures[direction];
    if (this.isDepartureBound(byDirection)) {
      return byDirection;
    }

    const dayType = this.asDayTypeName(dayTypeName);
    if (!dayType) {
      return null;
    }

    if (this.isRecord(byDirection)) {
      const byDirectionAndDayType = byDirection[dayType];
      if (this.isDepartureBound(byDirectionAndDayType)) {
        return byDirectionAndDayType;
      }
    }

    const byDayType = departures[dayType];
    if (this.isRecord(byDayType)) {
      const byDayTypeAndDirection = byDayType[direction];
      if (this.isDepartureBound(byDayTypeAndDirection)) {
        return byDayTypeAndDirection;
      }
    }

    return null;
  }

  public onSelectStop(stopId: string, isSelected: boolean): void {
    if (isSelected) {
      return;
    }
    this.store.dispatch(SchedulePageActions.selectStop({ stopId }));
  }

  private asDayTypeName(value: string | null): DayTypeName | null {
    return value === 'weekday' || value === 'weekend' ? value : null;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === 'object' && !Array.isArray(value);
  }

  private isDepartureBound(value: unknown): value is DepartureBound {
    if (!this.isRecord(value)) {
      return false;
    }

    return typeof value['first'] === 'string' && typeof value['last'] === 'string';
  }
}
