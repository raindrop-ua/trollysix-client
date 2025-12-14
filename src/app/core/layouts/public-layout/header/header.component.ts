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
import { DialogService } from '../../../services/dialog.service';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { ThemeSwitcherComponent } from '../../../../shared/components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ThemeSwitcherComponent, SvgIconComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class HeaderComponent implements OnInit {
  protected readonly AppRouteEnum = AppRouteEnum;
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  public readonly navigation = inject(NAVIGATION_TOKEN);
  public isMenuOpen = signal(false);

  private readonly premiumMessages = [
    'Just kidding — everyone here is already premium.',
    'Premium? Buddy, this whole app is premium by default.',
    'No subscriptions here — you were born premium.',
    'Relax, everything in this app is free and premium at the same time.',
    'It was unlocked the whole time, actually.',
    'You’ve reached the highest possible Premium tier.',
    'You are now premium. Again. And again. And forever.',
    'Premium status confirmed — but honestly, you never needed upgrading.',
  ];

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

  onPremium() {
    const message = this.getRandomMessage();

    this.dialogService
      .open({
        title: 'Premium unlocked!',
        message,
        confirmText: 'Nice!',
        variant: 'warning',
        disableClose: false,
        cancelText: '',
        customIcon: 'premium',
      })
      .subscribe();
  }

  private getRandomMessage() {
    const list = this.premiumMessages;
    return list[Math.floor(Math.random() * list.length)];
  }
}
