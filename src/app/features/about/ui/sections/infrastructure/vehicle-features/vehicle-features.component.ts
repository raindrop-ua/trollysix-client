import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { COPY } from '@core/content';

import { VehicleFeature } from '@features/about/data-access/models/vehicle-feature';
import { TooltipDirective } from '@shared/directives/tooltip.directive';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-vehicle-features',
  imports: [SvgIconComponent, TooltipDirective],
  templateUrl: './vehicle-features.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class VehicleFeaturesComponent {
  public readonly vehicleFeatures = signal<VehicleFeature[]>([
    {
      name: COPY.about.infrastructure.vehicleFeatures[0].name,
      ariaLabel: COPY.about.infrastructure.vehicleFeatures[0].ariaLabel,
      icon: 'accessibility',
    },
    {
      name: COPY.about.infrastructure.vehicleFeatures[1].name,
      ariaLabel: COPY.about.infrastructure.vehicleFeatures[1].ariaLabel,
      icon: 'speech',
    },
    {
      name: COPY.about.infrastructure.vehicleFeatures[2].name,
      ariaLabel: COPY.about.infrastructure.vehicleFeatures[2].ariaLabel,
      icon: 'battery-charging',
    },
  ]);
}
