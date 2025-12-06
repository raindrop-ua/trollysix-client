import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GenericSectionBlockComponent } from '../generic-section-block/generic-section-block.component';

@Component({
  selector: 'app-notice',
  imports: [GenericSectionBlockComponent],
  templateUrl: './notice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class NoticeComponent {}
