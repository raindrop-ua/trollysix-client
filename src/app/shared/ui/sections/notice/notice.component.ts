import { Component, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@app/core/content/copy.util';
import { GenericSectionBlockComponent } from '@app/shared/ui/sections';

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
