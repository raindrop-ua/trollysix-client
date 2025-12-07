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
      description: 'Some test description',
      direction: 'forward',
    },
    {
      title: 'Institute of Physical Education',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Обласний пенсійний фонд',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Воднолижний стадіон',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Студентська',
      description: '',
      direction: 'forward',
    },
    {
      title: 'ж/м Перемога-1',
      description: '',
      direction: 'forward',
    },
    {
      title: 'ж/м Перемога-2',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Спорткомплекс "Схід"',
      description: '',
      direction: 'forward',
    },
    {
      title: 'вул. Космічна',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Лоцманська',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Школа №66',
      description: '',
      direction: 'forward',
    },
    {
      title: 'бульв. Слави',
      description: '',
      direction: 'forward',
    },
    {
      title: 'провулок Добровольців',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Південний міст',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Гаванська',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Придніпровська ТЕС',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Медична',
      description: '',
      direction: 'forward',
    },
    {
      title: 'вул. Електрична',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Rotorna',
      description: '',
      direction: 'forward',
    },
    {
      title: 'вул. 20-річчя Перемоги',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Сквер Сосновий',
      description: '',
      direction: 'forward',
    },
    {
      title: 'Pridniprovsk',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Сквер Сосновий',
      description: '',
      direction: 'backward',
    },
    {
      title: 'вул. 20-річчя Перемоги',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Rotorna',
      description: '',
      direction: 'backward',
    },
    {
      title: 'вул. Медична',
      description: '',
      direction: 'backward',
    },
    {
      title: 'вул. Василя Грунтенка',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Придніпровська ТЕС',
      description: '',
      direction: 'backward',
    },
    {
      title: 'вул. Гаванська',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Південний міст',
      description: '',
      direction: 'backward',
    },
    {
      title: 'провулок Добровольців',
      description: '',
      direction: 'backward',
    },
    {
      title: 'бульв. Слави',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Школа №66',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Лоцманська',
      description: '',
      direction: 'backward',
    },
    {
      title: 'вул. Космічна',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Спорткомплекс "Схід"',
      description: '',
      direction: 'backward',
    },
    {
      title: 'ж/м Перемога-2',
      description: '',
      direction: 'backward',
    },
    {
      title: 'ж/м Перемога-1',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Студентська',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Воднолижний стадіон',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Обласний пенсійний фонд',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Інститут фізкультури',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Дитячий туристичний центр',
      description: '',
      direction: 'backward',
    },
    {
      title: 'вул. Героїв Крут',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Mechnikov Hospital',
      description: '',
      direction: 'backward',
    },
    {
      title: 'Парк ім. Шевченка',
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
