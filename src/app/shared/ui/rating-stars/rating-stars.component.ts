import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

type StarKind = 'filled' | 'empty-yellow' | 'empty-gray';

@Component({
  selector: 'trollysix-rating-stars',
  imports: [SvgIconComponent],
  templateUrl: './rating-stars.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex gap-1' },
})
export class RatingStarsComponent {
  public readonly rating = input.required<number>();

  public readonly starKinds = computed<StarKind[]>(() => {
    const ratingRaw = this.rating() ?? 0;
    const rating = Math.max(0, Math.min(5, ratingRaw));

    const full = Math.floor(rating);
    const hasFraction = rating > full; // 4.1..4.9 => true

    return Array.from({ length: 5 }, (_, i) => {
      const idx = i + 1;

      if (idx <= full) return 'filled';

      if (hasFraction && idx === full + 1) return 'empty-yellow';

      return 'empty-gray';
    });
  });
}
