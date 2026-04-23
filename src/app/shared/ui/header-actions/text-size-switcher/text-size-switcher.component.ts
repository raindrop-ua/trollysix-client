import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { copy } from '@core/content/copy.util';
import { TextSizeService } from '@core/services/text-size.service';

import { IconButtonDirective } from '@shared/directives/icon-button.directive';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-text-size-switcher',
  imports: [IconButtonDirective, SvgIconComponent],
  templateUrl: './text-size-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSizeSwitcherComponent {
  readonly copyCommon = copy('common');
  protected readonly textSizeService = inject(TextSizeService);

  modeSignal = this.textSizeService.mode;

  protected toggleTextSize(): void {
    this.textSizeService.toggle();
  }
}
