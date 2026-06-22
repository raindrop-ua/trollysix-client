import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { finalize } from 'rxjs';

import { environment } from '@environments/environment';

import { ApiActivityService } from '@core/services/api-activity.service';

export const apiActivityInterceptor: HttpInterceptorFn = (req, next) => {
  const activityService = inject(ApiActivityService);

  if (!isApiRequest(req.url)) {
    return next(req);
  }

  activityService.begin();

  return next(req).pipe(finalize(() => activityService.end()));
};

function isApiRequest(url: string): boolean {
  const apiUrl = environment.BASE_API_URL.replace(/\/$/, '');

  return url === apiUrl || url.startsWith(`${apiUrl}/`);
}
