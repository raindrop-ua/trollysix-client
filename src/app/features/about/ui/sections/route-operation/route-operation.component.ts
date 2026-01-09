import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { OperatingDataService } from '@features/about/data-access/services/operating-data.service';
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
  private operatingDataService = inject(OperatingDataService);
  public readonly operatingData = this.operatingDataService.operating;
}
