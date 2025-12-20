import {
  Component,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
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
  vehicleFeatures = signal(['accessibility', 'speech']);
}
