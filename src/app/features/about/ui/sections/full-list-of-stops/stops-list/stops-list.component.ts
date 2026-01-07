import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { RouteStop } from '@features/about/data-access/models/route-stops.model';
import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

import { StopsListItemComponent } from '../stops-list-item/stops-list-item.component';

@Component({
  selector: 'trollysix-stops-list',
  imports: [StopsListItemComponent, SvgIconComponent],
  templateUrl: './stops-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex' },
})
export class StopsListComponent {
  public title = input.required<string>();
  public stops = input.required<RouteStop[]>();
  public direction = input.required<'forward' | 'backward'>();
}
