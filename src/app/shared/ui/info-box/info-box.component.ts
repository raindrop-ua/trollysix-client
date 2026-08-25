import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-info-box',
  imports: [SvgIconComponent],
  templateUrl: './info-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class InfoBoxComponent {}
