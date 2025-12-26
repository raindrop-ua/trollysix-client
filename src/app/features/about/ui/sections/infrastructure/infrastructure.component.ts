import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GenericSectionBlockComponent } from '../../../../../shared/ui/sections';
import { InfrastructureCardComponent } from './infrastructure-card/infrastructure-card.component';
import { VehicleFeaturesComponent } from './vehicle-features/vehicle-features.component';

@Component({
  selector: 'app-infrastructure',
  imports: [
    NgOptimizedImage,
    GenericSectionBlockComponent,
    InfrastructureCardComponent,
    VehicleFeaturesComponent,
  ],
  templateUrl: './infrastructure.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class InfrastructureComponent {}
