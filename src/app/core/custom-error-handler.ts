import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ToastService } from './services/toast.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  private toastService: ToastService = inject(ToastService);

  handleError(error: unknown) {
    this.toastService.error('We are already working on it.', {
      title: 'Error detected',
      duration: 5_000,
    });
    console.warn(error);
  }
}
