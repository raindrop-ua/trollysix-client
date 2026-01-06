import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { ValueProp } from '../../../../data-access/models/value-prop.model';

@Component({
  selector: 'trollysix-value-prop',
  imports: [],
  templateUrl: './value-prop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ValuePropComponent {
  valueProp = input.required<ValueProp>();
}
