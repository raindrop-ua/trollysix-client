import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { ClipboardService } from '@core/services/clipboard.service';
import { ToastService } from '@core/services/toast.service';

import { scheduleFeature } from '../data-access/store/schedule.reducer';

@Injectable({ providedIn: 'root' })
export class ShareScheduleService {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly clipboardService = inject(ClipboardService);
  private readonly toastService = inject(ToastService);

  shareSchedule(): void {
    combineLatest([
      this.store.select(scheduleFeature.selectSelectedStopId),
      this.store.select(scheduleFeature.selectSelectedDayTypeName),
      this.store.select(scheduleFeature.selectSelectedDirectionName),
    ])
      .pipe(take(1))
      .subscribe(async ([stopId, dayType, direction]) => {
        if (!stopId || !dayType || !direction) {
          this.toastService.error(
            'Nothing to share yet (select stop/day/direction)',
          );
          return;
        }

        const tree = this.router.createUrlTree(['/schedule'], {
          queryParams: { stopId, dayType, direction },
        });

        const url = `${location.origin}${this.router.serializeUrl(tree)}`;
        const result = await this.clipboardService.copy(url);

        this.showShareResult(result.ok);
      });
  }

  private showShareResult(ok: boolean) {
    if (ok) {
      this.toastService.success('Link copied to clipboard');
    } else {
      this.toastService.error('Link could not be copied to clipboard');
    }
  }
}
