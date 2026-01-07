import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { copy } from '@core/content/copy.util';

import {
  BigClaimsComponent,
  MastheadComponent,
  ReadyForRouteSixComponent,
  TestimonialsComponent,
  ThisIsTrollysixComponent,
  MetricsCoveredComponent,
} from '@features/home/ui';
import { BtnDirective } from '@shared/directives/btn.directive';
import { AttentionComponent } from '@shared/ui/sections';

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
