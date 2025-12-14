import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GenericHeaderComponent } from '../../../../shared/components/sections/generic-header/generic-header.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [GenericHeaderComponent],
  templateUrl: './privacy-policy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class PrivacyPolicyComponent {}
