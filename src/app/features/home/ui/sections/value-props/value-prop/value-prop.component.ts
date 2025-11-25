import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ValueProp } from '../value-prop.model';

@Component({
  selector: 'app-value-prop',
  imports: [],
  templateUrl: './value-prop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ValuePropComponent {
  valueProp = input.required<ValueProp>();
}
