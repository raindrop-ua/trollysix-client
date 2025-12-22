import { inject, Injectable } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { ClipboardService } from '../../../core/services/clipboard.service';

@Injectable({
  providedIn: 'root',
})
export class ShareScheduleService {
  private readonly toastService = inject(ToastService);
  private readonly clipboard = inject(ClipboardService);

  public shareSchedule() {
    const text = location.href;

    this.clipboard
      .copy(text)
      .then(() => {
        this.toastService.success(`Link successfully copied to clipboard`);
      })
      .catch(() => {
        this.toastService.error(`Link could not be copied to clipboard`);
      });
  }
}
