import { ChangeDetectionStrategy, Component } from '@angular/core';

import { copy } from '@core/content';

import { GenericHeaderComponent } from '@shared/ui/sections/generic-header/generic-header.component';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

@Component({
  selector: 'trollysix-support',
  imports: [GenericHeaderComponent, GenericSectionBlockComponent],
  templateUrl: './support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SupportComponent {
  public readonly copyLegal = copy('legal');
}
