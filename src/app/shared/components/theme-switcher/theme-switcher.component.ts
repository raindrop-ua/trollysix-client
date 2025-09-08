import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {ThemeService} from "../../../core/services/theme.service";

@Component({
  selector: 'app-theme-switcher',
  imports: [
      SvgIconComponent
  ],
  templateUrl: './theme-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  private readonly theme = inject(ThemeService);

  themeSignal = this.theme.theme;

  toggleTheme() {
    this.theme.toggle();
  }
}
