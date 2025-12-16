import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectionStrategy,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { Testimonials } from '../../../data-access/models/testimonial.model';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { TestimonialsListService } from '../../../services/testimonials-list.service';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { SpinnerComponent } from '../../../../../shared/components/sections';
import {
  RatingStarsComponent,
  ColorSplashComponent,
} from '../../../../../shared/components';

@Component({
  selector: 'app-testimonials',
  imports: [
    RevealOnScrollDirective,
    DecimalPipe,
    TestimonialComponent,
    SpinnerComponent,
    RatingStarsComponent,
    ColorSplashComponent,
  ],
  templateUrl: './testimonials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class TestimonialsComponent implements OnInit {
  private testimonialsListService = inject(TestimonialsListService);
  private destroyRef = inject(DestroyRef);
  public readonly testimonials = signal<Testimonials | null>(null);
  public readonly isLoading = signal(true);

  ngOnInit() {
    this.testimonialsListService
      .getTestimonials()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (testimonials) => {
          this.testimonials.set(testimonials);
          this.isLoading.set(false);
        },
        error: () => {
          this.testimonials.set(null);
          this.isLoading.set(false);
        },
      });
  }
}
