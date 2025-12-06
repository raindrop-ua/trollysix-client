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
  Testimonials,
  TestimonialsComponent,
  ThisIsTrollysixComponent,
  ValuePropsComponent,
} from '../ui';

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
  public readonly testimonials: Testimonials = {
    title: 'Loved by everyday riders',
    description:
      'No advertising. No noise. Just what helps you get things done.',
    testimonials: [
      {
        name: 'Dmytro',
        place: 'Pridniprovsk',
        text: 'Stop being late for work. Time is money, and TrollySix is my alarm clock on wheels.',
        avatarUrl: 'e92e6500-dc29-4852-a190-e14036d6b6f0.webp',
      },
      {
        name: 'Marina',
        place: 'Pridniprovsk',
        text: "No tables or PDFs. Just open and go. It's like Apple, only for trolleybuses.",
        avatarUrl: '8f0bb7c0-b9d7-4dfb-82de-c7aa85dbf21f.webp',
      },
      {
        name: 'Oleh',
        place: 'Pridniprovsk',
        text: 'TrollySix - like a Swiss watch. Thanks for the simplicity and precision.',
        avatarUrl: 'a219da8d-8b66-44b6-ad85-209517f87293.webp',
      },
    ],
  };
}
