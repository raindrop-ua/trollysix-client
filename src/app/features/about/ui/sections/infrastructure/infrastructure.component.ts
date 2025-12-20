import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GenericSectionBlockComponent } from '../../../../../shared/components/sections';
import { InfrastructureCardComponent } from './infrastructure-card/infrastructure-card.component';
import { SvgIconComponent } from '../../../../../shared/components';

@Component({
  selector: 'app-infrastructure',
  imports: [
    NgOptimizedImage,
    GenericSectionBlockComponent,
    InfrastructureCardComponent,
    SvgIconComponent,
  ],
  templateUrl: './infrastructure.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class InfrastructureComponent {
  vehicleFeatures = signal(['accessibility', 'speech']);
}
