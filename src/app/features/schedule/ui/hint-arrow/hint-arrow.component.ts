import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DirectionName } from '../../data-access/models/direction.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-hint-arrow',
  imports: [NgClass],
  templateUrl: './hint-arrow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class HintArrowComponent {
  public direction = input<DirectionName | null | undefined>();
}
