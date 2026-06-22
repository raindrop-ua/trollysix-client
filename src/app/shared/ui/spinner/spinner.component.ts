import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-spinner',
  imports: [SvgIconComponent],
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SpinnerComponent {}
