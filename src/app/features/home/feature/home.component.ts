import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { copy } from '@core/content/copy.util';
import { BtnDirective } from '@shared/directives/btn.directive';
import { AttentionComponent } from '@shared/ui/sections';

import {
  BigClaimsComponent,
  MastheadComponent,
  ReadyForRouteSixComponent,
  TestimonialsComponent,
  ThisIsTrollysixComponent,
} from '../ui';
import { MetricsCoveredComponent } from '../ui/sections/metrics-covered/metrics-covered.component';

@Component({
  selector: 'trollysix-home',
  imports: [
    RouterLink,
    MastheadComponent,
    BigClaimsComponent,
    ThisIsTrollysixComponent,
    TestimonialsComponent,
    ReadyForRouteSixComponent,
    AttentionComponent,
    TestimonialsComponent,
    BtnDirective,
    MetricsCoveredComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class HomeComponent {
  readonly copyCommon = copy('common');
}
