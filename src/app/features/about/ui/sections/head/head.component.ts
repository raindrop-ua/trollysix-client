import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-head',
  imports: [RevealOnScrollDirective],
  templateUrl: './head.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class HeadComponent {}
