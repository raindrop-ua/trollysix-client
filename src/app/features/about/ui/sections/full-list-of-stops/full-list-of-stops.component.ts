import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RouteStop } from '../../../data-access/models/route-stops.model';
import { GenericSectionBlockComponent } from '../../../../../shared/components/sections';
import { StopsListItemComponent } from './stops-list-item/stops-list-item.component';

@Component({
  selector: 'app-full-list-of-stops',
  imports: [GenericSectionBlockComponent, StopsListItemComponent],
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
      title: 'Heroiv Krut St.',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Monument of Glory',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Institute of Physical Education',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Regional Pension Fund',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Water Ski Stadium',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Studentska',
      description: '',
      direction: 'forward',
    },
    {
      title: 'r/a. Victory-1',
      description: '',
      direction: 'forward',
    },
    {
      title: 'r/a. Victory-2',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Sports Complex "East"',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Kosmichna St.',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Lotsmanska',
      description: '',
      direction: 'forward',
    },
    {
      title: 'School No. 66',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Boulevard of Glory',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Volunteer Lane',
      description: '',
      direction: 'forward',
    },
    {
      title: 'South Bridge',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Havanska St.',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Pridniprovska TPP',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Medical St.',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Elektrichna St.',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Rotorna St.',
      description: '',
      direction: 'forward',
    },
    {
      title: '20th Anniversary of Victory St.',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Sosnovy Square',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Pridniprovsk',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Sosnovy Square',
      description: '',
      direction: 'backward',
    },
    {
      title: '20th Anniversary of Victory St.',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Rotorna St.',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Medical St.',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Vasyl Hruntenko St.',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Pridniprovska TPP',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Havanska St.',
      description: '',
      direction: 'backward',
    },
    {
      title: 'South Bridge',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Volunteer Lane',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Boulevard of Glory',
      description: '',
      direction: 'backward',
    },
    {
      title: 'School No. 66',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Lotsmanska',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Kosmichna St.',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Sports Complex "East"',
      description: '',
      direction: 'backward',
    },
    {
      title: 'r/a. Victory-2',
      description: '',
      direction: 'backward',
    },
    {
      title: 'r/a. Victory-1',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Studentska',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Water Ski Stadium',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Regional Pension Fund',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Institute of Physical Education',
      description: '',
      direction: 'backward',
    },
    {
      title: "Children's Tourist Center",
      description: '',
      direction: 'backward',
    },
    {
      title: 'Heroiv Krut St.',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Mechnikov Hospital',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Shevchenko Park',
      description: '',
      direction: 'backward',
    },
  ];

  get routeStopsForward() {
    return this.routeStops.filter((stop) => stop.direction === 'forward');
  }

  get routeStopsBackward() {
    return this.routeStops.filter((stop) => stop.direction === 'backward');
  }
}
