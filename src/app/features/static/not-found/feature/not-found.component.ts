import { Component, ChangeDetectionStrategy } from '@angular/core';

import { GenericHeaderComponent } from '@shared/ui/sections/generic-header/generic-header.component';

@Component({
  selector: 'trollysix-not-found',
  imports: [GenericHeaderComponent],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class NotFoundComponent {}
