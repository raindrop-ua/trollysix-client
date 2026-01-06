import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'trollysix-spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SpinnerComponent {}
