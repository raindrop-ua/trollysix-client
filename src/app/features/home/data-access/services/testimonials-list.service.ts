import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, Observable, of, shareReplay, timeout } from 'rxjs';

import { environment } from '@environments/environment';

import { Testimonials } from '../models/testimonial.model';

@Injectable()
export class TestimonialsListService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private readonly REQUEST_TIMEOUT_MS = 8_000;
  private http = inject(HttpClient);

  private readonly testimonials$ = this.http
    .get<Testimonials>(`${this.BASE_URL}/testimonials`)
    .pipe(
      timeout(this.REQUEST_TIMEOUT_MS),
      catchError(() => of<Testimonials>({ testimonials: [], overallRating: 0 })),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  public getTestimonials(): Observable<Testimonials> {
    return this.testimonials$;
  }
}
