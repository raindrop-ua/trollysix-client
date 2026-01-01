import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { copy } from '../../../../../core/content/copy.util';

@Component({
  selector: 'app-head',
  imports: [RevealOnScrollDirective],
  templateUrl: './head.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class HeadComponent {
  readonly copyAbout = copy('about');
}
