import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Metric } from '../../../shared/ui/sections';

@Injectable({
  providedIn: 'root',
})
export class MetricsListService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private http = inject(HttpClient);

  private readonly metrics$ = this.http
    .get<Metric[]>(`${this.BASE_URL}/metrics`)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

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
