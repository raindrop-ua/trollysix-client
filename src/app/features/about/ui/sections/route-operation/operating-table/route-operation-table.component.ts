import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { OperatingDay } from '@app/shared/models/operating-days.model';
import { SvgIconComponent } from '@app/shared/ui';

interface IntervalCell {
  value: string;
  gridColumnStart: number;
  isLast: boolean;
}

@Component({
  selector: 'trollysix-route-operation-table',
  imports: [SvgIconComponent],
  templateUrl: './route-operation-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class RouteOperationTableComponent {
  public dayOperatingData = input.required<OperatingDay>();

  public readonly intervalCells = computed<IntervalCell[]>(() => {
    const intervals = this.dayOperatingData().intervals ?? [];
    const lastIndex = intervals.length - 1;

    return intervals.map((value, index) => ({
      value,
      gridColumnStart: 4 + index,
      isLast: index === lastIndex,
    }));
  });

  public readonly operationHours = computed<IntervalCell[]>(() => {
    const operationHours = this.dayOperatingData().operationHours ?? [];
    const lastIndex = operationHours.length - 1;

    return operationHours.map((value, index) => ({
      value,
      gridColumnStart: 4 + index,
      isLast: index === lastIndex,
    }));
  });
}
