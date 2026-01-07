import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { copy } from '@core/content/copy.util';

import { BigClaimsComponent } from '@features/home/ui/sections/big-claims/big-claims.component';
import { MastheadComponent } from '@features/home/ui/sections/masthead/masthead.component';
import { MetricsCoveredComponent } from '@features/home/ui/sections/metrics-covered/metrics-covered.component';
import { ReadyForRouteSixComponent } from '@features/home/ui/sections/ready-for-route-six/ready-for-route-six.component';
import { TestimonialsComponent } from '@features/home/ui/sections/testimonials/testimonials.component';
import { ThisIsTrollysixComponent } from '@features/home/ui/sections/this-is-trollysix/this-is-trollysix.component';
import { BtnDirective } from '@shared/directives/btn.directive';
import { AttentionComponent } from '@shared/ui/sections/attention/attention.component';

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
