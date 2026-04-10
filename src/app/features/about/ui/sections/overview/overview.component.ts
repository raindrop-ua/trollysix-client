import { Component, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content/copy.util';

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

  private readonly paragraphs = this.copyAbout.generalDescription;

  readonly firstHalf = this.paragraphs.slice(
    0,
    Math.ceil(this.paragraphs.length / 2),
  );

  readonly secondHalf = this.paragraphs.slice(
    Math.ceil(this.paragraphs.length / 2),
  );
}
