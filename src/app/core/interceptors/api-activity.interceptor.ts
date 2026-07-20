import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { finalize, Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { ApiActivityService } from '@core/services/api-activity.service';

import { SILENT_HTTP_REQUEST } from './silent-http-request.context';

export const apiActivityInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<unknown>> => {
  const activityService = inject(ApiActivityService);

  if (!isApiRequest(req.url) || req.context.get(SILENT_HTTP_REQUEST)) {
    return next(req);
  }

  activityService.begin();

  return next(req).pipe(finalize(() => activityService.end()));
};

function isApiRequest(url: string): boolean {
  const apiUrl = environment.BASE_API_URL.replace(/\/$/, '');

  return url === apiUrl || url.startsWith(`${apiUrl}/`);
}
