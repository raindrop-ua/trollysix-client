import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, Observable, of, shareReplay, timeout } from 'rxjs';

import { environment } from '@environments/environment';

import { RouteStop } from '../models/route-stops.model';

@Injectable()
export class StopsListService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private readonly REQUEST_TIMEOUT_MS = 8_000;
  private http = inject(HttpClient);

  private readonly stops$ = this.http
    .get<RouteStop[]>(`${this.BASE_URL}/stops-list`)
    .pipe(
      timeout(this.REQUEST_TIMEOUT_MS),
      catchError(() => of<RouteStop[]>([])),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  public getStops(): Observable<RouteStop[]> {
    return this.stops$;
  }
}
