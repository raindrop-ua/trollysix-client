import { Injectable, inject, DestroyRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { filter, interval, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService } from './dialog.service';

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  private readonly swUpdate = inject(SwUpdate);
  private readonly dialogService = inject(DialogService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates
      .pipe(
        filter((evt) => evt.type === 'VERSION_READY'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.dialogService
          .open({
            title: 'Update available!',
            message: 'An update is available. Update now?',
            confirmText: 'Update',
            variant: 'info',
            disableClose: true,
          })
          .subscribe((result) => {
            if (result === 'confirm') {
              document.location.reload();
            }
          });
      });

    interval(2 * 60_000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.swUpdate.checkForUpdate()),
      )
      .subscribe({
        error: () => {
          /* empty */
        },
      });
  }
}
