import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Testimonial } from '../../../../data-access/models/testimonial.model';
import { NgOptimizedImage } from '@angular/common';
import { SvgIconComponent } from '../../../../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-testimonial',
  imports: [NgOptimizedImage, SvgIconComponent],
  templateUrl: './testimonial.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class TestimonialComponent {
  testimonial = input.required<Testimonial>();

  readonly stars = computed(() => {
    const rating = this.testimonial().rating;
    return Array.from({ length: 5 }, (_, i) => {
      const starIndex = i + 1;

      if (rating >= starIndex) {
        return 1;
      }

      if (rating >= starIndex - 0.5) {
        return 0.5;
      }

      return 0;
    });
  });
}
