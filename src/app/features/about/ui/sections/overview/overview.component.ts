import { Component, ChangeDetectionStrategy, computed } from '@angular/core';

import { copy } from '@core/content';

import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { GenericSectionBlockComponent } from '@shared/ui/sections/generic-section-block/generic-section-block.component';

@Component({
  selector: 'trollysix-overview',
  imports: [RevealOnScrollDirective, GenericSectionBlockComponent],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class OverviewComponent {
  readonly copyAbout = copy('about');

  readonly splitContent = computed(() => {
    const paragraphs = this.copyAbout.generalDescription;
    const splitIndex = Math.ceil(paragraphs.length / 2);

    return {
      firstHalf: paragraphs.slice(0, splitIndex),
      secondHalf: paragraphs.slice(splitIndex),
    };
  });
}
