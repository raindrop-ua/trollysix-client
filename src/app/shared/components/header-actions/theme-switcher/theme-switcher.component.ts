import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { ThemeService } from '../../../../core/services/theme.service';
import { IconButtonDirective } from '../../../directives/icon-button.directive';

@Component({
  selector: 'app-theme-switcher',
  imports: [SvgIconComponent, IconButtonDirective],
  templateUrl: './theme-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class ThemeSwitcherComponent {
  private readonly theme = inject(ThemeService);

  themeSignal = this.theme.theme;

  toggleTheme() {
    this.theme.toggle();
  }
}
