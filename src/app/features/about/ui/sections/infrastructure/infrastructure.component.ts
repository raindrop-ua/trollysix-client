import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GenericSectionBlockComponent } from '../../../../../shared/components/sections';
import { InfrastructureCardComponent } from './infrastructure-card/infrastructure-card.component';

@Component({
  selector: 'app-infrastructure',
  imports: [
    NgOptimizedImage,
    GenericSectionBlockComponent,
    InfrastructureCardComponent,
  ],
  templateUrl: './infrastructure.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class InfrastructureComponent {}
