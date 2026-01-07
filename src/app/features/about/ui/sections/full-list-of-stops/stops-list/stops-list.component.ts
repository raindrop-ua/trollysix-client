import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { SvgIconComponent } from '@app/shared/ui';
import { RouteStop } from '@features/about/data-access/models/route-stops.model';

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
