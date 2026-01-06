import {
  Component,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { VehicleFeature } from '../../../../data-access/models/vehicle-feature';
import { SvgIconComponent } from '../../../../../../shared/ui';
import { TooltipDirective } from '../../../../../../shared/directives/tooltip.directive';

@Component({
  selector: 'trollysix-vehicle-features',
  imports: [SvgIconComponent, TooltipDirective],
  templateUrl: './vehicle-features.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
