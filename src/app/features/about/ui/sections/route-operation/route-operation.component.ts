import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

import { OperatingDays } from '@features/about/data-access/models/operating-days.model';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

import { RouteOperationTableComponent } from './operating-table/route-operation-table.component';

@Component({
  selector: 'trollysix-route-operation',
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
      intervals: ['13 - 14', '27 - 29', '13 - 14', '27 - 29'],
      operationHours: [
        '7:00 - 10:00',
        '10:00 - 15:00',
        '15:00 - 18:00',
        '18:00 onwards',
      ],
    },
    weekend: {
      title: 'Weekend',
      vehiclesQuantity: 4,
      intervals: ['26 - 28', '26 - 28', '26 - 28', '26 - 74'],
      operationHours: [
        '7:00 - 10:00',
        '10:00 - 15:00',
        '15:00 - 18:00',
        '18:00 onwards',
      ],
    },
  });
}
