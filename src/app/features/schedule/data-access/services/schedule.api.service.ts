import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  inject,
  Injectable,
  makeStateKey,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { environment } from '@environments/environment';

import { DayType } from '../models/daytype.model';
import { Direction } from '../models/direction.model';
import { Stop } from '../models/stop.model';
import { Timetable } from '../models/timetable.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleApiService {
  private readonly apiUrl = environment.BASE_API_URL;
  private readonly http = inject(HttpClient);
  private readonly transferState = inject(TransferState);
  private readonly platformId = inject(PLATFORM_ID);

  getStops(): Observable<Stop[]> {
    return this.getWithTransferState<Stop[]>(
      'schedule:stops',
      `${this.apiUrl}/stops`,
    );
  }

  getDayTypes(): Observable<DayType[]> {
    return this.getWithTransferState<DayType[]>(
      'schedule:day-types',
      `${this.apiUrl}/day-types`,
    );
  }

  getDirections(): Observable<Direction[]> {
    return this.getWithTransferState<Direction[]>(
      'schedule:directions',
      `${this.apiUrl}/directions`,
    );
  }

  getTimetable(
    stopId: string,
    dayTypeName: string,
    directionName: string,
  ): Observable<Timetable> {
    const params = new HttpParams()
      .set('stopId', stopId)
      .set('dayType', dayTypeName)
      .set('direction', directionName);

    const url = `${this.apiUrl}/timetables`;
    const transferKey = [
      'schedule:timetable',
      stopId,
      dayTypeName,
      directionName,
    ].join(':');

    return this.getWithTransferState<Timetable>(transferKey, url, { params });
  }

  private getWithTransferState<T>(
    transferKey: string,
    url: string,
    options?: { params: HttpParams },
  ): Observable<T> {
    const stateKey = makeStateKey<T>(transferKey);

    if (this.transferState.hasKey(stateKey)) {
      const cached = this.transferState.get<T | null>(stateKey, null);
      this.transferState.remove(stateKey);
      if (cached !== null) {
        return of(cached);
      }
    }

    return this.http.get<T>(url, options).pipe(
      tap((response) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(stateKey, response);
        }
      }),
    );
  }
}
