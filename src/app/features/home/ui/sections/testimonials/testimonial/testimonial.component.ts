import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Testimonial } from '../../../../data-access/models/testimonial.model';
import { RatingStarsComponent } from '../../../../../../shared/components';

@Component({
  selector: 'app-testimonial',
  imports: [NgOptimizedImage, RatingStarsComponent],
  templateUrl: './testimonial.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class TestimonialComponent {
  testimonial = input.required<Testimonial>();
}
