import { Component, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content';

import { GenericHeaderComponent } from '@shared/ui/sections/generic-header/generic-header.component';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

@Component({
  selector: 'trollysix-terms-of-use',
  imports: [GenericHeaderComponent, GenericSectionBlockComponent],
  templateUrl: './terms-of-use.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class TermsOfUseComponent {
  readonly copyLegal = copy('legal');
}
