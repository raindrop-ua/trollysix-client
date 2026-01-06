import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ValueProp } from '../../../../data-access/models/value-prop.model';

@Component({
  selector: 'trollysix-value-prop',
  imports: [],
  templateUrl: './value-prop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class ValuePropComponent {
  valueProp = input.required<ValueProp>();
}
