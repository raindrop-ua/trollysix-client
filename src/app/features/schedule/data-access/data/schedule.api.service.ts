import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Stop } from '../models/stop.model';
import { DayType } from '../models/daytype.model';
import { Direction } from '../models/direction.model';
import { Timetable } from '../models/timetable.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleApiService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private http = inject(HttpClient);

  getStops(): Observable<Stop[]> {
    return this.http.get<Stop[]>(`${this.BASE_URL}/stops`);
  }

  getDayTypes(): Observable<DayType[]> {
    return this.http.get<DayType[]>(`${this.BASE_URL}/day-types`);
  }

  getDirections(): Observable<Direction[]> {
    return this.http.get<Direction[]>(`${this.BASE_URL}/directions`);
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

    return this.http.get<Timetable>(`${this.BASE_URL}/timetables`, { params });
  }
}
