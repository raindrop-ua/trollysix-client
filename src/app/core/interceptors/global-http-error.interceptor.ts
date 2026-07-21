import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable, retry, tap, timer } from 'rxjs';

import { ToastService } from '@core/services/toast.service';

import { SILENT_HTTP_REQUEST } from './silent-http-request.context';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<unknown>> => {
  const toastService: ToastService = inject(ToastService);

  if (req.context.get(SILENT_HTTP_REQUEST)) {
    return next(req);
  }

  return next(req).pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => {
        if (!isRetriableRequest(req) || !isTransientError(error)) {
          throw error;
        }

        // Exponential backoff: 500ms, 1000ms, 2000ms
        return timer(500 * 2 ** (retryCount - 1));
      },
    }),
    tap({
      error: (error: HttpErrorResponse) => {
        if (isExpectedNoDataCase(req, error)) {
          return;
        }

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

function isExpectedNoDataCase(
  req: HttpRequest<unknown>,
  error: HttpErrorResponse,
): boolean {
  return (
    req.method.toUpperCase() === 'GET' &&
    req.url.includes('/timetables') &&
    error.status === 404
  );
}

function isRetriableRequest(req: HttpRequest<unknown>): boolean {
  return ['GET', 'HEAD', 'OPTIONS'].includes(req.method.toUpperCase());
}

function isTransientError(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) {
    return false;
  }

  if (error.status === 0) {
    return true;
  }

  return [408, 429, 502, 503, 504].includes(error.status);
}
