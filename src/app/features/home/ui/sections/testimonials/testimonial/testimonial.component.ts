import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Testimonial } from '../../../../data-access/models/testimonial.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-testimonial',
  imports: [NgOptimizedImage],
  templateUrl: './testimonial.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TestimonialComponent {
  testimonial = input.required<Testimonial>();
}
