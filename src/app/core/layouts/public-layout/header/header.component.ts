import {
  Component,
  inject,
  signal,
  OnInit,
  DestroyRef,
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

import { filter } from 'rxjs';

import { NAVIGATION_TOKEN } from '@core/config/navigation.config';
import { copy } from '@core/content/copy.util';
import { AppRouteEnum } from '@core/enums/app-route.enum';

import { HeaderActionsComponent } from '@shared/ui/header-actions/header-actions.component';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-header',
  imports: [RouterLink, RouterLinkActive, SvgIconComponent, HeaderActionsComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuToggleButton')
  private menuToggleButton?: ElementRef<HTMLButtonElement>;

  protected readonly AppRouteEnum = AppRouteEnum;
  readonly copyCommon = copy('common');
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  public readonly navigation = inject(NAVIGATION_TOKEN);
  public isMenuOpen = signal(false);
  protected readonly mobileMenuId = 'mobile-main-menu';

  public ngOnInit() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (this.isMenuOpen()) {
          this.closeMenu(false);
        }
      });
  }

  toggleMenu() {
    if (this.isMenuOpen()) {
      this.closeMenu(false);
      return;
    }

    this.openMenu();
  }

  closeMenu(restoreFocus = false) {
    if (!this.isMenuOpen()) {
      return;
    }
    this.isMenuOpen.set(false);
    if (restoreFocus) {
      this.menuToggleButton?.nativeElement.focus();
    }
  }

  private openMenu() {
    this.isMenuOpen.set(true);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMenuOpen()) {
      this.closeMenu(true);
    }
  }
}
