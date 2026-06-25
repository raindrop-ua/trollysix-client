import { Component, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content';

import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

@Component({
  selector: 'trollysix-notice',
  imports: [GenericSectionBlockComponent],
  templateUrl: './notice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class NoticeComponent {
  readonly copyRouteNote = copy('routeNote');
}
