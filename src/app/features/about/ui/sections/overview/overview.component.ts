import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LazyVideoDirective } from '../../../../../shared/directives/lazy-video.directive';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-overview',
  imports: [LazyVideoDirective, RevealOnScrollDirective],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {}
