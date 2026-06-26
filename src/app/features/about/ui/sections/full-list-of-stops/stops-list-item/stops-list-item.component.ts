import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { copy } from '@core/content';

import { RouteStop } from '@features/about/data-access/models/route-stops.model';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-stops-list-item',
  imports: [SvgIconComponent],
  templateUrl: './stops-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StopsListItemComponent {
  public readonly copyAbout = copy('about');
  public readonly stopItemData = input.required<RouteStop>();
  public readonly isLastItem = input(false);
  public readonly itemIndex = input.required<number>();
}
