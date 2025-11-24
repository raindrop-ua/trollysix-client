import {
  Component,
  input,
  ChangeDetectionStrategy,
  InputSignal,
} from '@angular/core';
import { Testimonials } from './testimonial.model';
import { RevealOnScrollDirective } from '../../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-testimonials',
  imports: [RevealOnScrollDirective],
  templateUrl: './testimonials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  public readonly data: InputSignal<Testimonials> =
    input.required<Testimonials>();
}
