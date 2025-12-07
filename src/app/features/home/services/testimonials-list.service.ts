import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Testimonial } from '../data-access/models/testimonial.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsListService {
  private readonly BASE_URL = environment.BASE_API_URL;
  private http = inject(HttpClient);

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.BASE_URL}/testimonials`);
  }
}
