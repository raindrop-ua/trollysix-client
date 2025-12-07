import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Testimonial } from '../data-access/models/testimonial.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsListService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private http = inject(HttpClient);

  private readonly testimonials$ = this.http
    .get<Testimonial[]>(`${this.BASE_URL}/testimonials`)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getTestimonials(): Observable<Testimonial[]> {
    return this.testimonials$;
  }

  getTestimonialsSafe(): Observable<Testimonial[]> {
    return this.getTestimonials().pipe(
      catchError(() => {
        return of<Testimonial[]>([]);
      }),
    );
  }
}
