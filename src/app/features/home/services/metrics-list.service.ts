import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Metric } from '../../../shared/components/sections';

@Injectable({
  providedIn: 'root',
})
export class MetricsListService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private http = inject(HttpClient);

  getMetrics(): Observable<Metric[]> {
    return this.http.get<Metric[]>(`${this.BASE_URL}/metrics`);
  }
}
