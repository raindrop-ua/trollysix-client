import { ErrorHandler, inject, Injectable } from '@angular/core';

import { ToastService } from '@core/services/toast.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  private toastService: ToastService = inject(ToastService);

  public handleError(error: unknown): void {
    this.toastService.error('We are already working on it.', {
      title: 'Error detected',
    });
    console.warn(error);
  }
}
