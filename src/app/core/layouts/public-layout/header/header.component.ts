import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectorRef,
  DestroyRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NAVIGATION_TOKEN } from '../../../config/navigation.config';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { ThemeSwitcherComponent } from '../../../../shared/components/theme-switcher/theme-switcher.component';
import { AppRouteEnum } from '../../../enums/app-route.enum';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ThemeSwitcherComponent, SvgIconComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  public navigation = inject(NAVIGATION_TOKEN);
  public isMenuOpen = signal(false);

  public ngOnInit() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
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

  protected readonly AppRouteEnum = AppRouteEnum;

  toggleMenu() {
    this.isMenuOpen.update(() => !this.isMenuOpen());
  }
}
