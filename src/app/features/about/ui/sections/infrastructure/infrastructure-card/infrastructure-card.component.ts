import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'trollysix-infrastructure-card',
  imports: [],
  templateUrl: './infrastructure-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class InfrastructureCardComponent {
  public title = input<string>();
}
