import { Component, ChangeDetectionStrategy } from '@angular/core';

import { GenericHeaderComponent } from '@shared/ui/sections/generic-header/generic-header.component';

@Component({
  selector: 'trollysix-privacy-policy',
  imports: [GenericHeaderComponent],
  templateUrl: './privacy-policy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class PrivacyPolicyComponent {}
