import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'trollysix-generic-section-block',
  imports: [],
  templateUrl: './generic-section-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class GenericSectionBlockComponent {}
