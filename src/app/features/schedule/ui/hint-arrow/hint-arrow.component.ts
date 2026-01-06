import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { DirectionName } from '../../data-access/models/direction.model';

@Component({
  selector: 'trollysix-hint-arrow',
  imports: [],
  templateUrl: './hint-arrow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class HintArrowComponent {
  public direction = input<DirectionName | null | undefined>();
}
