import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { SvgIconComponent } from '../../../../../shared/components/svg-icon/svg-icon.component';
import { RouteStop } from '../../../data-access/models/route-stops.model';
import { GenericSectionBlockComponent } from '../../../../../shared/components/sections';

@Component({
  selector: 'app-full-list-of-stops',
  imports: [GenericSectionBlockComponent, SvgIconComponent],
  templateUrl: './full-list-of-stops.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FullListOfStopsComponent {
  public readonly routeStops: RouteStop[] = [
    {
      title: 'Historical Museum',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Rotorna',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Pridniprovsk',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Rotorna',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Mechnikov Hospital',
      description: '',
      direction: 'backward',
    },
  ];
}
