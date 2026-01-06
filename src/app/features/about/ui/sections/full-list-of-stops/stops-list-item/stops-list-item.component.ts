import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { SvgIconComponent } from '../../../../../../shared/ui';
import { RouteStop } from '../../../../data-access/models/route-stops.model';

@Component({
  selector: 'trollysix-stops-list-item',
  imports: [SvgIconComponent],
  templateUrl: './stops-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class StopsListItemComponent {
  public readonly stopItemData = input.required<RouteStop>();
  public readonly isLastItem = input(false);
  public readonly itemIndex = input.required<number>();
}
