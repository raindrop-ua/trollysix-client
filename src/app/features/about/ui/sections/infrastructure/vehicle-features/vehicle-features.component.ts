import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

import { TooltipDirective } from '@app/shared/directives/tooltip.directive';
import { VehicleFeature } from '@features/about/data-access/models/vehicle-feature';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

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
