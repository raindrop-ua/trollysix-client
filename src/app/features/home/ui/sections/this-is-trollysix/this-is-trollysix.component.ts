import { Component, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content';

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
  readonly copyHome = copy('home');
  protected readonly valueProps: ValueProp[] = [...this.copyHome.thisIsTrollySix.valueProps];
}
