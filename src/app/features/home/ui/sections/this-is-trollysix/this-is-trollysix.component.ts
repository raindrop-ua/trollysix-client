import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ValuePropComponent } from './value-prop/value-prop.component';
import { ValueProp } from '../../../data-access/models/value-prop.model';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-this-is-trollysix',
  imports: [ValuePropComponent, RevealOnScrollDirective],
  templateUrl: './this-is-trollysix.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class ThisIsTrollysixComponent {
  protected readonly valueProps: ValueProp[] = [
    {
      title: 'Precision, by default',
      description:
        'Precise time, neat statuses: missed, next, upcoming. Everything to get there on time - no surprises.',
    },
    {
      title: 'Designed to disappear',
      description:
        "An interface that doesn't distract. Focus only on the route - because time is the most precious thing.",
    },
    {
      title: 'Built for today',
      description:
        "Mobile first, lightweight, fast. Works like it's the only thing you need.",
    },
  ];
}
