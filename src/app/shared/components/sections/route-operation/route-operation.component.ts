import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GenericSectionBlockComponent } from '../generic-section-block/generic-section-block.component';
import { RouteOperationTableComponent } from './operating-table/route-operation-table.component';
import { OperatingDays } from '../../../models/operating-days.model';

@Component({
  selector: 'app-route-operation',
  imports: [GenericSectionBlockComponent, RouteOperationTableComponent],
  templateUrl: './route-operation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class RouteOperationComponent {
  public readonly operatingData = signal<OperatingDays>({
    weekday: {
      title: 'Weekday',
      vehiclesQuantity: 8,
      intervals: ['13-14', '27-29', '13-14', '27-29'],
    },
    weekend: {
      title: 'Weekend',
      vehiclesQuantity: 4,
      intervals: ['26-28', '26-28', '26-28', '26-74'],
    },
  });
}
