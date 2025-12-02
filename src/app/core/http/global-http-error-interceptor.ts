import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { retry, tap } from 'rxjs';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({ count: 3, delay: 1000 }),
    tap({
      error: (error: HttpErrorResponse) => {
        console.log('Error:', error.status, error.message);
        if ([500, 404].includes(error.status)) {
          // snack or something like it
        }
      },
    }),
  );
};
