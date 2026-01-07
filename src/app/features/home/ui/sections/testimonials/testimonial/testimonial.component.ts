import { NgOptimizedImage } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { Testimonial } from '@features/home/data-access/models/testimonial.model';
import { RatingStarsComponent } from '@shared/ui/rating-stars/rating-stars.component';

@Component({
  selector: 'trollysix-testimonial',
  imports: [NgOptimizedImage, RatingStarsComponent],
  templateUrl: './testimonial.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class TestimonialComponent {
  testimonial = input.required<Testimonial>();
}
