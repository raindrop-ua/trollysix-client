import { DecimalPipe } from '@angular/common';
import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectionStrategy,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { copy } from '@core/content/copy.util';

import { Testimonials } from '@features/home/data-access/models/testimonial.model';
import { TestimonialsListService } from '@features/home/data-access/services/testimonials-list.service';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { ColorSplashComponent } from '@shared/ui/color-splash/color-splash.component';
import { RatingStarsComponent } from '@shared/ui/rating-stars/rating-stars.component';
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component';

import { TestimonialComponent } from './testimonial/testimonial.component';

@Component({
  selector: 'trollysix-testimonials',
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
  readonly copyHome = copy('home');
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
