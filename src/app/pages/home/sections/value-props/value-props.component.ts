import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ValueProp {
  title: string;
  description?: string;
}

@Component({
  selector: 'app-value-props',
  imports: [],
  templateUrl: './value-props.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValuePropsComponent {
  protected readonly valueProps: ValueProp[] = [
    {
      title: 'Precision, by default',
      description: 'Precise time, neat statuses: missed, next, upcoming. Everything to get there on time - no surprises.',
    },
    {
      title: 'Designed to disappear',
      description: 'An interface that doesn\'t distract. Focus only on the route - because time is the most precious thing.',
    },
    {
      title: 'Built for today',
      description: 'Mobile first, lightweight, fast. Works like it\'s the only thing you need.',
    }
  ]
}
