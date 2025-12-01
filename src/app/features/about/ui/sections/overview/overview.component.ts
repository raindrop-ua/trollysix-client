import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { LazyVideoDirective } from '../../../../../shared/directives/lazy-video.directive';
import { CheatCodeDirective } from '../../../../../shared/directives/cheat-code.directive';

@Component({
  selector: 'app-overview',
  imports: [RevealOnScrollDirective, LazyVideoDirective, CheatCodeDirective],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent {
  public showVideo = signal(false);
}
