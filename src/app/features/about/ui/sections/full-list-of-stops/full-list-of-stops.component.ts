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
      description: 'Scheduled',
      direction: 'forward',
      scheduled: true,
    },
    {
      title: 'Heroiv Krut St.',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Monument of Glory',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Institute of Physical Education',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Regional Pension Fund',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Water Ski Stadium',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Studentska',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'r/a. Victory-1',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'r/a. Victory-2',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Sports Complex "East"',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Kosmichna St.',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Lotsmanska',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'School No. 66',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Boulevard of Glory',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Volunteer Lane',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'South Bridge',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Havanska St.',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Pridniprovska TPP',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Medical St.',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Elektrichna St.',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Rotorna St.',
      description: 'Scheduled',
      direction: 'forward',
      scheduled: true,
    },
    {
      title: '20th Anniversary of Victory St.',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Sosnovy Square',
      description: '',
      direction: 'forward',
      scheduled: false,
    },
    {
      title: 'Pridniprovsk',
      description: 'Scheduled',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Sosnovy Square',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: '20th Anniversary of Victory St.',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Rotorna St.',
      description: 'Scheduled',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Medical St.',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Vasyl Hruntenko St.',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Pridniprovska TPP',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Havanska St.',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'South Bridge',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Volunteer Lane',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Boulevard of Glory',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'School No. 66',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Lotsmanska',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Kosmichna St.',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Sports Complex "East"',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'r/a. Victory-2',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'r/a. Victory-1',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Studentska',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Water Ski Stadium',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Regional Pension Fund',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Institute of Physical Education',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: "Children's Tourist Center",
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Heroiv Krut St.',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
    {
      title: 'Mechnikov Hospital',
      description: 'Scheduled',
      direction: 'backward',
      scheduled: true,
    },
    {
      title: 'Shevchenko Park',
      description: '',
      direction: 'backward',
      scheduled: false,
    },
  ];

  get routeStopsForward() {
    return this.routeStops.filter((stop) => stop.direction === 'forward');
  }

  get routeStopsBackward() {
    return this.routeStops.filter((stop) => stop.direction === 'backward');
  }
}
