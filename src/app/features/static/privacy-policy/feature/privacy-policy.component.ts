import { Component, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content/copy.util';

import { GenericHeaderComponent } from '@shared/ui/sections/generic-header/generic-header.component';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

@Component({
  selector: 'trollysix-privacy-policy',
  imports: [GenericHeaderComponent, GenericSectionBlockComponent],
  templateUrl: './privacy-policy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class PrivacyPolicyComponent {
  readonly copyLegal = copy('legal');
}
