import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { DialogService } from '../../../core/services/dialog.service';

@Component({
  selector: 'app-premium-cta',
  imports: [SvgIconComponent],
  templateUrl: './premium-cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class PremiumCtaComponent {
  private readonly dialogService = inject(DialogService);

  private readonly premiumMessages = [
    'Just kidding — everyone here is already premium.',
    'Premium? Buddy, this whole app is premium by default.',
    'No subscriptions here — you were born premium.',
    'Relax, everything in this app is free and premium at the same time.',
    'It was unlocked the whole time, actually.',
    'You’ve reached the highest possible Premium tier.',
    'You are now premium. Again. And again. And forever.',
    'Premium status confirmed — but honestly, you never needed upgrading.',
  ];

  onPremium() {
    const message = this.getRandomMessage();

    this.dialogService
      .open({
        title: 'Premium unlocked!',
        message,
        confirmText: 'Nice!',
        variant: 'warning',
        disableClose: false,
        cancelText: '',
        customIcon: 'premium',
      })
      .subscribe();
  }

  private getRandomMessage() {
    const list = this.premiumMessages;
    return list[Math.floor(Math.random() * list.length)];
  }
}
