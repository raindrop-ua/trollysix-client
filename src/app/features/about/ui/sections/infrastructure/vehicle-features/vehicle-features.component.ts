import {
  Component,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { VehicleFeature } from '../../../../data-access/models/vehicle-feature';
import { SvgIconComponent } from '../../../../../../shared/components';

@Component({
  selector: 'app-vehicle-features',
  imports: [SvgIconComponent],
  templateUrl: './vehicle-features.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class VehicleFeaturesComponent {
  vehicleFeatures = signal<VehicleFeature[]>([
    {
      name: 'Accessibility',
      ariaLabel: 'Accessibility feature',
      icon: 'accessibility',
    },
    {
      name: 'Announcer',
      ariaLabel: 'Announcer feature',
      icon: 'speech',
    },
    {
      name: 'Battery',
      ariaLabel: 'Battery feature',
      icon: 'battery-charging',
    },
  ]);
}
