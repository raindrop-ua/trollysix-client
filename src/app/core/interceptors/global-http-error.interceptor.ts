import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { retry, tap, timer } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService: ToastService = inject(ToastService);

  return next(req).pipe(
    retry({
      count: 3,
      delay: (_, retryCount) => timer(retryCount * 1_500),
    }),
    tap({
      error: (error: HttpErrorResponse) => {
        if ([500, 404].includes(error.status)) {
          toastService.error(error.message, {
            title: 'Error',
            duration: 5_000,
          });
        } else {
          toastService.error('Failed to load data', {
            title: 'Error',
            duration: 5_000,
          });
        }
      },
    }),
  );
};
