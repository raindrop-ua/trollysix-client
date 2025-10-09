import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-overview',
  imports: [RevealOnScrollDirective],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent {}
