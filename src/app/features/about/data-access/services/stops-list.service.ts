import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, shareReplay } from 'rxjs';

import { environment } from '@environments/environment';

import { RouteStop } from '../models/route-stops.model';

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
}
