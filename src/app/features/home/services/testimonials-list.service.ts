import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Testimonials } from '../data-access/models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialsListService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private http = inject(HttpClient);

  private readonly testimonials$ = this.http
    .get<Testimonials>(`${this.BASE_URL}/testimonials`)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  public getTestimonials(): Observable<Testimonials> {
    return this.testimonials$;
  }
}
