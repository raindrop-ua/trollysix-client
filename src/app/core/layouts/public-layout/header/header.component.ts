import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectorRef,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NAVIGATION_TOKEN } from '../../../config/navigation.config';
import { AppRouteEnum } from '../../../enums/app-route.enum';
import { SvgIconComponent } from '../../../../shared/components';
import { ThemeSwitcherComponent } from '../../../../shared/components';
import { PremiumCtaComponent } from '../../../../shared/components/premium-cta/premium-cta.component';
import { SettingsButtonComponent } from '../../../../shared/components/settings-button/settings-button.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ThemeSwitcherComponent,
    SvgIconComponent,
    PremiumCtaComponent,
    SettingsButtonComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class HeaderComponent implements OnInit {
  protected readonly AppRouteEnum = AppRouteEnum;
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  public readonly navigation = inject(NAVIGATION_TOKEN);
  public isMenuOpen = signal(false);

  public readonly showSettingsButton = signal<boolean>(false);
  public readonly showPremiumButton = signal<boolean>(true);

  public ngOnInit() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
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

  toggleMenu() {
    this.isMenuOpen.update(() => !this.isMenuOpen());
  }
}
