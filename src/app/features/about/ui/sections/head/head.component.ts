import { Component, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@app/core/content/copy.util';
import { RevealOnScrollDirective } from '@app/shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'trollysix-head',
  imports: [RevealOnScrollDirective],
  templateUrl: './head.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class HeadComponent {
  readonly copyAbout = copy('about');
}
