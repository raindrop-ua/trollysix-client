import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { StopsListItemComponent } from '../stops-list-item/stops-list-item.component';
import { SvgIconComponent } from '../../../../../../shared/components';
import { RouteStop } from '../../../../data-access/models/route-stops.model';

@Component({
  selector: 'app-stops-list',
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
