import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AttentionComponent,
  Metric,
  MetricsComponent,
  Testimonials,
  TestimonialsComponent,
} from '../../../shared/components/sections';
import {
  BigClaimsComponent,
  MastheadComponent,
  ReadyForRouteSixComponent,
  ThisIsTrollysixComponent,
  ValuePropsComponent,
} from '../ui';

@Component({
  selector: 'app-home',
  imports: [
    MastheadComponent,
    ValuePropsComponent,
    BigClaimsComponent,
    ThisIsTrollysixComponent,
    TestimonialsComponent,
    ReadyForRouteSixComponent,
    MetricsComponent,
    AttentionComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public readonly testimonials: Testimonials = {
    title: 'Loved by everyday riders',
    description:
      'No advertising. No noise. Just what helps you get things done.',
    testimonials: [
      {
        name: 'Dmytro',
        place: 'Pridniprovsk',
        text: 'Stop being late for work. Time is money, and TrollySix is my alarm clock on wheels.',
      },
      {
        name: 'Marina',
        place: 'Pridniprovsk',
        text: "No tables or PDFs. Just open and go. It's like Apple, only for trolleybuses.",
      },
      {
        name: 'Oleh',
        place: 'Pridniprovsk',
        text: 'Route 6 - like a Swiss watch. Thanks for the simplicity and precision.',
      },
    ],
  };
}
