import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { GlobalMessageService } from '@core/services/global-message.service';

@Component({
  selector: 'trollysix-global-message',
  imports: [AsyncPipe, NgClass],
  templateUrl: './global-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class GlobalMessageComponent {
  private globalMessageService = inject(GlobalMessageService);
  public globalMessage$ = this.globalMessageService.getGlobalMessageSafe();
}
