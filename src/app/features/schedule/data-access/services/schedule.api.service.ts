import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  inject,
  makeStateKey,
  PLATFORM_ID,
  Service,
  TransferState,
} from '@angular/core';

import { Observable, map, of, tap } from 'rxjs';

import { environment } from '@environments/environment';

import { ApiResponse } from '@core/models/api-response.model';

import { DayType } from '../models/daytype.model';
import { Direction } from '../models/direction.model';
import {
  parseDayTypesResponse,
  parseDirectionsResponse,
  parseStopsResponse,
  parseTimetableResponse,
} from '../models/schedule-api.contract';
import { Stop } from '../models/stop.model';
import { Timetable } from '../models/timetable.model';

@Service()
export class ScheduleApiService {
  private readonly apiUrl = environment.BASE_API_URL;
  private readonly http = inject(HttpClient);
  private readonly transferState = inject(TransferState);
  private readonly platformId = inject(PLATFORM_ID);

  public getStops(): Observable<Stop[]> {
    return this.getWithTransferState<Stop[]>(
      'schedule:stops',
      `${this.apiUrl}/stops`,
      parseStopsResponse,
    );
  }

  public getDayTypes(): Observable<DayType[]> {
    return this.getWithTransferState<DayType[]>(
      'schedule:day-types',
      `${this.apiUrl}/day-types`,
      parseDayTypesResponse,
    );
  }

  public getDirections(): Observable<Direction[]> {
    return this.getWithTransferState<Direction[]>(
      'schedule:directions',
      `${this.apiUrl}/directions`,
      parseDirectionsResponse,
    );
  }

  public getTimetable(
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

    return this.getWithTransferState<Timetable>(
      transferKey,
      url,
      parseTimetableResponse,
      { params },
    );
  }

  private getWithTransferState<T>(
    transferKey: string,
    url: string,
    parser: (value: unknown) => T,
    options?: { params: HttpParams },
  ): Observable<T> {
    const stateKey = makeStateKey<T>(transferKey);

    if (this.transferState.hasKey(stateKey)) {
      const cached = this.transferState.get<unknown>(stateKey, null);
      this.transferState.remove(stateKey);
      if (cached !== null) {
        try {
          return of(parser(cached));
        } catch {
          // Stale or invalid TransferState must not block client-side recovery.
        }
      }
    }

    return this.http.get<ApiResponse<unknown>>(url, options).pipe(
      map((response) => parser(response.data)),
      tap((response) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(stateKey, response);
        }
      }),
    );
  }
}
