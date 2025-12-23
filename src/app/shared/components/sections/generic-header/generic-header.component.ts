import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-generic-header',
  imports: [RevealOnScrollDirective],
  templateUrl: './generic-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class GenericHeaderComponent {
  public readonly title = input.required<string>();
}
