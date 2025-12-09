import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { HideAfterDirective } from '../../../../shared/directives/hide-after.directive';

@Component({
  selector: 'app-hint-arrow',
  imports: [HideAfterDirective],
  templateUrl: './hint-arrow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HintArrowComponent {}
