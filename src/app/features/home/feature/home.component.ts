import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AttentionComponent,
  Metric,
  MetricsComponent,
} from '../../../shared/components/sections';
import {
  BigClaimsComponent,
  MastheadComponent,
  ReadyForRouteSixComponent,
  TestimonialsComponent,
  ThisIsTrollysixComponent,
  ValuePropsComponent,
} from '../ui';
import { BtnDirective } from '../../../shared/directives/btn.directive';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MastheadComponent,
    ValuePropsComponent,
    BigClaimsComponent,
    ThisIsTrollysixComponent,
    TestimonialsComponent,
    ReadyForRouteSixComponent,
    MetricsComponent,
    AttentionComponent,
    TestimonialsComponent,
    BtnDirective,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  public readonly metrics: Metric[] = [
    {
      title: '97%',
      description: 'on-time clarity',
    },
    {
      title: '4',
      description: 'key stops',
    },
    {
      title: '2',
      description: 'directions',
    },
  ];
}
