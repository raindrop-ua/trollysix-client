import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Testimonial } from '../../../data-access/models/testimonial.model';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';
import { TestimonialsListService } from '../../../services/testimonials-list.service';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { SpinnerComponent } from '../../../../../shared/components/sections';

@Component({
  selector: 'app-testimonials',
  imports: [RevealOnScrollDirective, TestimonialComponent, SpinnerComponent],
  templateUrl: './testimonials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TestimonialsComponent implements OnInit {
  private testimonialsListService = inject(TestimonialsListService);
  private destroyRef = inject(DestroyRef);
  public readonly testimonials = signal<Testimonial[]>([]);
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
          this.testimonials.set([]);
          this.isLoading.set(false);
        },
      });
  }
}
