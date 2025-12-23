import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-infrastructure-card',
  imports: [],
  templateUrl: './infrastructure-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block' },
})
export class InfrastructureCardComponent {
  public title = input<string>();
}
