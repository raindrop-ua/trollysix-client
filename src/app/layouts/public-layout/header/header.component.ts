import { isPlatformBrowser, Location } from '@angular/common';
import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectorRef,
  DestroyRef,
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
  ViewChild,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { filter } from 'rxjs';

import { NAVIGATION_TOKEN } from '@config/navigation.config';

import { copy } from '@core/content/copy.util';
import { AppRouteEnum } from '@core/enums/app-route.enum';

import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

import { HeaderActionsComponent } from './header-actions/header-actions.component';

@Component({
  selector: 'trollysix-header',
  imports: [RouterLink, SvgIconComponent, HeaderActionsComponent],
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
  private readonly location = inject(Location);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  public readonly navItems = inject(NAVIGATION_TOKEN);
  public isMenuOpen = signal(false);
  protected readonly mobileMenuId = 'mobile-main-menu';
  private currentPathWithQuery = signal<string>('/');

  public ngOnInit() {
    this.currentPathWithQuery.set(this.location.path(true) || '/');
    const unregisterOnUrlChange = this.location.onUrlChange((url) => {
      this.currentPathWithQuery.set(url || '/');
      this.cdr.markForCheck();
    });
    this.destroyRef.onDestroy(unregisterOnUrlChange);

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (this.isMenuOpen()) {
          this.closeMenu(false);
        }
        this.cdr.markForCheck();
      });
  }

  public isLinkActive(path: string): boolean {
    return this.router.isActive(path, {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    });
  }

  public getLinkQueryParams(path: string): Record<string, string> | null {
    if (
      !this.isBrowser ||
      path !== AppRouteEnum.Schedule ||
      !this.isLinkActive(path)
    ) {
      return null;
    }

    const urlTree = this.router.parseUrl(this.currentPathWithQuery());
    return Object.keys(urlTree.queryParams).length
      ? (urlTree.queryParams as Record<string, string>)
      : null;
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
