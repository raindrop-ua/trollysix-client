import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { SvgIconComponent } from '../../../../../../shared/ui';
import { OperatingDay } from '../../../../../../shared/models/operating-days.model';

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
  encapsulation: ViewEncapsulation.None,
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
