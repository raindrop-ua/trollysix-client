import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { GlobalMessageService } from '../../services/global-message.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-global-message',
  imports: [AsyncPipe, NgClass],
  templateUrl: './global-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GlobalMessageComponent {
  private globalMessageService = inject(GlobalMessageService);
  public globalMessage$ = this.globalMessageService.getGlobalMessageSafe();
}
