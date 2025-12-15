import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GenericSectionBlockComponent } from '../generic-section-block/generic-section-block.component';
import { OperatingTableComponent } from './operating-table/operating-table.component';
import { OperatingDays } from '../../../models/operating-days.model';

@Component({
  selector: 'app-operating-of-route',
  imports: [GenericSectionBlockComponent, OperatingTableComponent],
  templateUrl: './operating-of-route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class OperatingOfRouteComponent {
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
