import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { COPY } from '@core/content';
import { ClipboardService } from '@core/services/clipboard.service';
import { ToastService } from '@core/services/toast.service';

import { scheduleFeature } from '../../data-access/store/schedule.reducer';

@Injectable()
export class ShareScheduleService {
  private readonly copy = COPY.schedule.services.share;
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly clipboardService = inject(ClipboardService);
  private readonly toastService = inject(ToastService);
  private readonly document = inject(DOCUMENT, { optional: true });
  private readonly isBrowser = typeof window !== 'undefined';

  shareSchedule(): void {
    if (!this.isBrowser) {
      return;
    }

    combineLatest([
      this.store.select(scheduleFeature.selectSelectedStopId),
      this.store.select(scheduleFeature.selectSelectedDayTypeName),
      this.store.select(scheduleFeature.selectSelectedDirectionName),
    ])
      .pipe(take(1))
      .subscribe(async ([stopId, dayType, direction]) => {
        if (!stopId || !dayType || !direction) {
          this.toastService.error(this.copy.nothingToShare);
          return;
        }

        const tree = this.router.createUrlTree(['/schedule'], {
          queryParams: { stopId, dayType, direction },
        });

        const origin =
          this.document?.location?.origin ??
          (typeof location !== 'undefined' ? location.origin : null);
        if (!origin) {
          this.showShareResult(false);
          return;
        }

        const url = `${origin}${this.router.serializeUrl(tree)}`;
        const result = await this.clipboardService.copy(url);

        this.showShareResult(result.ok);
      });
  }

  private showShareResult(ok: boolean) {
    if (ok) {
      this.toastService.success(this.copy.linkCopied);
    } else {
      this.toastService.error(this.copy.linkCopyFailed);
    }
  }
}
