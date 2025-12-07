import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RouteStop } from '../data-access/models/route-stops.model';

@Injectable({
  providedIn: 'root',
})
export class StopsListService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private http = inject(HttpClient);

  getStops(): Observable<RouteStop[]> {
    return this.http.get<RouteStop[]>(`${this.BASE_URL}/stops-list`);
  }
}
