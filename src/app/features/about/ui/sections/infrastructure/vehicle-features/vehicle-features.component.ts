import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

import { TooltipDirective } from '@app/shared/directives/tooltip.directive';
import { SvgIconComponent } from '@app/shared/ui';

import { VehicleFeature } from '../../../../data-access/models/vehicle-feature';

@Component({
  selector: 'trollysix-vehicle-features',
  imports: [SvgIconComponent, TooltipDirective],
  templateUrl: './vehicle-features.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class VehicleFeaturesComponent {
  vehicleFeatures = signal<VehicleFeature[]>([
    {
      name: 'Accessibility',
      ariaLabel: 'Accessibility',
      icon: 'accessibility',
    },
    {
      name: 'Onboard Announcement System',
      ariaLabel: 'Onboard Announcement System',
      icon: 'speech',
    },
    {
      name: 'Autonomous Operation',
      ariaLabel: 'Autonomous Operation',
      icon: 'battery-charging',
    },
  ]);
}
