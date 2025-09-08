import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {NAVIGATION_TOKEN} from "../../../config/navigation.config";
import {ScheduleMockService} from "../../../../features/schedule/services/schedule-mock.service";
import {ClockService} from "../../../services/clock.service";
import {AsyncPipe, DatePipe} from "@angular/common";
import {SvgIconComponent} from "../../../../shared/components/svg-icon/svg-icon.component";
import {ThemeSwitcherComponent} from "../../../../shared/components/theme-switcher/theme-switcher.component";
import {Status} from "../../../../features/schedule/components/schedule-controls/departure.model";
import {AppRouteEnum} from '../../../enums/app-route.enum'

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ThemeSwitcherComponent,
    SvgIconComponent,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  public clockService: ClockService = inject(ClockService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  public navigation = inject(NAVIGATION_TOKEN);
  public readonly showSticky = signal<boolean>(false);
  private readonly schedule = inject(ScheduleMockService);

  readonly departures$ = this.schedule.departures$;

  readonly next$ = this.departures$.pipe(
    map(list => list.find(d => d.status === Status.Now) ?? list.find(d => d.status !== Status.Past) ?? null)
  );

  public ngOnInit() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        tap((value) => {
          this.showSticky.set(value.url.includes(AppRouteEnum.Schedule));
        }),
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

  protected readonly AppRouteEnum = AppRouteEnum;
}

