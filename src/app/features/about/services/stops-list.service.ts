import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { RouteStop } from '../data-access/models/route-stops.model';
import { Metric } from '../../../shared/ui/sections';

@Injectable({ providedIn: 'root' })
export class StopsListService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private http = inject(HttpClient);

  private readonly stops$ = this.http
    .get<RouteStop[]>(`${this.BASE_URL}/stops-list`)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  public getStops(): Observable<RouteStop[]> {
    return this.stops$;
  }

  public getStopsSafe(): Observable<Metric[]> {
    return this.getStops().pipe(
      catchError(() => {
        return of<Metric[]>([]);
      }),
    );
  }
}
