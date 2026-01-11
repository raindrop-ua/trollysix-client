import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ValueProp } from '@features/home/data-access/models/value-prop.model';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

import { ValuePropComponent } from './value-prop/value-prop.component';

@Component({
  selector: 'trollysix-this-is-trollysix',
  imports: [ValuePropComponent, RevealOnScrollDirective],
  templateUrl: './this-is-trollysix.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
