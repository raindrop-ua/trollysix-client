import { inject, DestroyRef, Service } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwUpdate } from '@angular/service-worker';

import { EMPTY, catchError, filter, from, interval, switchMap } from 'rxjs';

import { COPY } from '@core/content';

import { DialogService } from './dialog.service';

@Service()
export class SwUpdateService {
  private readonly copy = COPY.services.swUpdate;
  private readonly swUpdate = inject(SwUpdate);
  private readonly dialogService = inject(DialogService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates
      .pipe(
        filter((event) => event.type === 'VERSION_READY'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.dialogService
          .openModal({
            title: this.copy.dialogTitle,
            message: this.copy.dialogMessage,
            confirmText: this.copy.confirmText,
            variant: 'info',
            disableClose: true,
            customIcon: 'monitor-down',
          })
          .subscribe((result) => {
            if (result === 'confirm') {
              document.location.reload();
            }
          });
      });

    interval(3 * 60_000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() =>
          from(this.swUpdate.checkForUpdate()).pipe(catchError(() => EMPTY)),
        ),
      )
      .subscribe();
  }
}
