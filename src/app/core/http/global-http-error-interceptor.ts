import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { retry, tap } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    retry({ count: 3, delay: 1000 }),
    tap({
      error: (error: HttpErrorResponse) => {
        if ([500, 404].includes(error.status)) {
          toast.error(error.message, {
            title: 'Error',
            duration: 5000,
          });
        } else {
          toast.error('Failed to load data', {
            title: 'Error',
            duration: 5000,
          });
        }
      },
    }),
  );
};
