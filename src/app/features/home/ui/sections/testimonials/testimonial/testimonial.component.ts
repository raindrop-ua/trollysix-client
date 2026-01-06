import { NgOptimizedImage } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { RatingStarsComponent } from '@app/shared/ui';

import { Testimonial } from '../../../../data-access/models/testimonial.model';

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
