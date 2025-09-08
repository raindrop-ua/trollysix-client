import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Stop} from "../stops-selector/stop.model";
import {OptionsSelectorComponent} from "../options-selector/options-selector.component";
import {StopsSelectorComponent} from "../stops-selector/stops-selector.component";
import {SvgIconComponent} from "../../../../shared/components/svg-icon/svg-icon.component";

@Component({
  selector: 'app-selectors-group',
  imports: [
    OptionsSelectorComponent,
    StopsSelectorComponent,
    SvgIconComponent
  ],
  templateUrl: './selectors-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorsGroupComponent {
  public availableVehicles = 4;
  public dayOptions = [
    {
      label: 'Weekday',
      value: 'weekday',
    },
    {
      label: 'Weekend',
      value: 'weekend',
    },
    {
      label: 'Holiday',
      value: 'holiday',
    }
  ];
  public directionOptions = [
    {
      label: 'Forward',
      value: 'forward',
    },
    {
      label: 'Backward',
      value: 'backward',
      disabled: true,
    }
  ];
  public stops: Stop[] = [
    {
      id: '21a4839e-01a9-42ad-b17d-5cd7fd83c13f',
      name: 'Pridniprovsk',
      description: 'Residential district. Near river embankment.',
      firstDeparture: '6:00',
      lastDeparture: '20:22',
      style: 1,
      availableDirections: ['forward'],
    },
    {
      id: '5e6fd60f-97c6-4c7d-89e0-b31b859a7b70',
      name: 'Rotorna',
      description: 'Most romantic stop in Pridniprovsk.',
      firstDeparture: '6:05',
      lastDeparture: '20:27',
      style: 4,
      availableDirections: ['forward', 'backward'],
    },
    {
      id: 'df9f0e34-5b8d-481c-b29d-ad9ab07d6226',
      name: 'Mechnikov Hospital',
      description: 'Regional clinical hospital hub.',
      firstDeparture: '5:49',
      lastDeparture: '20:14',
      style: 3,
      availableDirections: ['forward'],
    },
    {
      id: '80d8f469-c025-403f-ba76-6af54070e2c6',
      name: 'Historical Museum',
      description: 'City center — scenic viewpoint.',
      firstDeparture: '5:54',
      lastDeparture: '20:19',
      style: 2,
      availableDirections: ['backward'],
    },
  ];
}
