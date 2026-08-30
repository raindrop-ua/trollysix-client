import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { SILENT_HTTP_REQUEST } from '@core/interceptors/silent-http-request.context';
import { ApiResponse } from '@core/models/api-response.model';

import { DirectionName } from '../models/direction.model';
import { parseWeatherResponse } from '../models/weather-api.contract';
import { Weather } from '../models/weather.model';

@Injectable()
export class WeatherApiService {
  private readonly http = inject(HttpClient);

  public getWeather(
    stopId: string,
    direction: DirectionName,
  ): Observable<Weather> {
    const params = new HttpParams()
      .set('stopId', stopId)
      .set('direction', direction);

    return this.http
      .get<ApiResponse<unknown>>(`${environment.BASE_API_URL}/weather`, {
        context: new HttpContext().set(SILENT_HTTP_REQUEST, true),
        params,
      })
      .pipe(map((response) => parseWeatherResponse(response.data)));
  }
}
