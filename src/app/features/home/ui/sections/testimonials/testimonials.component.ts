import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
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
  private testimonialsListService: TestimonialsListService = inject(
    TestimonialsListService,
  );
  public testimonialList = signal<Testimonial[]>([]);

  ngOnInit() {
    this.testimonialsListService.getTestimonials().subscribe((testimonials) => {
      this.testimonialList.set(testimonials);
    });
  }
}
