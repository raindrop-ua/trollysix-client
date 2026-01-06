import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { retry, tap, timer } from 'rxjs';

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
        if (error.status === 0) {
          toastService.error('Network error. Please check your connection.', {
            title: 'Connection issue',
          });
          return;
        }

        if ([500, 404].includes(error.status)) {
          toastService.error(error.message, {
            title: 'Error',
          });
        } else {
          toastService.error('Failed to load data', {
            title: 'Error',
          });
        }
      },
    }),
  );
};
