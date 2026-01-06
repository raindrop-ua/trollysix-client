import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { ThemeService } from '@app/core/services/theme.service';
import { SvgIconComponent } from '@app/shared/ui';
import { IconButtonDirective } from '@shared/directives/icon-button.directive';

@Component({
  selector: 'trollysix-theme-switcher',
  imports: [SvgIconComponent, IconButtonDirective],
  templateUrl: './theme-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ThemeSwitcherComponent {
  private readonly theme = inject(ThemeService);

  themeSignal = this.theme.theme;

  toggleTheme() {
    this.theme.toggle();
  }
}
