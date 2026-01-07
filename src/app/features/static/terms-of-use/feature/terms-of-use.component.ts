import { Component, ChangeDetectionStrategy } from '@angular/core';

import { GenericHeaderComponent } from '@app/shared/ui/sections/generic-header/generic-header.component';

@Component({
  selector: 'trollysix-terms-of-use',
  imports: [GenericHeaderComponent],
  templateUrl: './terms-of-use.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class TermsOfUseComponent {}
