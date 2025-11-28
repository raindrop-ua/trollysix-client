import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Testimonial } from '../../../../data-access/models/testimonial.model';

@Component({
  selector: 'app-testimonial',
  imports: [],
  templateUrl: './testimonial.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TestimonialComponent {
  testimonial = input.required<Testimonial>();
}
