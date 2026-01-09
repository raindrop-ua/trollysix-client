import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { TooltipDirective } from '@app/shared/directives/tooltip.directive';
import { VehicleFeaturesService } from '@features/about/data-access/services/vehicle-features.service';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-vehicle-features',
  imports: [SvgIconComponent, TooltipDirective],
  templateUrl: './vehicle-features.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class VehicleFeaturesComponent {
  private vehicleFeaturesService = inject(VehicleFeaturesService);
  public readonly vehicleFeatures = this.vehicleFeaturesService.features;
}
