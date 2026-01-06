import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { DirectionName } from '../../data-access/models/direction.model';

@Component({
  selector: 'trollysix-hint-arrow',
  imports: [],
  templateUrl: './hint-arrow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class HintArrowComponent {
  public direction = input<DirectionName | null | undefined>();
}
