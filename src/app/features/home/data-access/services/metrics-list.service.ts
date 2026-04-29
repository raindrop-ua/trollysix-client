import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { Observable, of, shareReplay, timeout } from 'rxjs';

import { environment } from '@environments/environment';

import { Metric } from '@shared/ui/sections/metrics/metrics.model';

@Injectable()
export class MetricsListService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private readonly REQUEST_TIMEOUT_MS = 8_000;
  private http = inject(HttpClient);

  private readonly metrics$ = this.http
    .get<Metric[]>(`${this.BASE_URL}/metrics`)
    .pipe(
      timeout(this.REQUEST_TIMEOUT_MS),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  public getMetrics(): Observable<Metric[]> {
    return this.metrics$;
  }

  public getMetricsSafe(): Observable<Metric[]> {
    return this.getMetrics().pipe(
      catchError(() => {
        return of<Metric[]>([]);
      }),
    );
  }
}
