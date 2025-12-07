import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { SvgIconComponent } from '../../../../../../shared/components/svg-icon/svg-icon.component';
import { RouteStop } from '../../../../data-access/models/route-stops.model';

@Component({
  selector: 'app-stops-list-item',
  imports: [SvgIconComponent],
  templateUrl: './stops-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StopsListItemComponent {
  stopItemData = input.required<RouteStop>();
  isLastItem = input(false);
  itemIndex = input.required<number>();
}
