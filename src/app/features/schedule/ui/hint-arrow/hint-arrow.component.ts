import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { DirectionName } from '../../data-access/models/direction.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-hint-arrow',
  imports: [],
  templateUrl: './hint-arrow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HintArrowComponent {
  public direction = input<DirectionName | null | undefined>();
}
