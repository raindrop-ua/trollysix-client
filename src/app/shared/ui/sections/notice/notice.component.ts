import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { GenericSectionBlockComponent } from '../generic-section-block/generic-section-block.component';
import { copy } from '../../../../core/content/copy.util';

@Component({
  selector: 'trollysix-notice',
  imports: [GenericSectionBlockComponent],
  templateUrl: './notice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class NoticeComponent {
  readonly copyRouteNote = copy('routeNote');
}
