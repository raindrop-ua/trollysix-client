import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';
import { OperatingDay } from '../../../../models/operating-days.model';

interface IntervalCell {
  value: string;
  gridColumnStart: number;
  isLast: boolean;
}

@Component({
  selector: 'app-route-operation-table',
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
}
