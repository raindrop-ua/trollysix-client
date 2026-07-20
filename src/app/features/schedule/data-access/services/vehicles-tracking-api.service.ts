import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { SILENT_HTTP_REQUEST } from '@core/interceptors/silent-http-request.context';

import { parseVehiclesTrackingResponse } from '../models/vehicles-tracking.contract';
import { VehiclesTrackingResponse } from '../models/vehicles-tracking.model';

@Injectable()
export class VehiclesTrackingApiService {
  private readonly http = inject(HttpClient);

  public getVehicles(): Observable<VehiclesTrackingResponse> {
    return this.http
      .get<unknown>(`${environment.BASE_API_URL}/vehicles`, {
        context: new HttpContext().set(SILENT_HTTP_REQUEST, true),
      })
      .pipe(map(parseVehiclesTrackingResponse));
  }
}
