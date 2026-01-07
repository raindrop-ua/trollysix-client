import { NgOptimizedImage } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

import { InfrastructureCardComponent } from './infrastructure-card/infrastructure-card.component';
import { VehicleFeaturesComponent } from './vehicle-features/vehicle-features.component';

@Component({
  selector: 'trollysix-infrastructure',
  imports: [
    NgOptimizedImage,
    GenericSectionBlockComponent,
    InfrastructureCardComponent,
    VehicleFeaturesComponent,
  ],
  templateUrl: './infrastructure.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class InfrastructureComponent {}
