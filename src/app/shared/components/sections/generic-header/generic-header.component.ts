import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RevealOnScrollDirective } from '../../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-generic-header',
  imports: [RevealOnScrollDirective],
  templateUrl: './generic-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class GenericHeaderComponent {
  public readonly title = input.required<string>();
}
