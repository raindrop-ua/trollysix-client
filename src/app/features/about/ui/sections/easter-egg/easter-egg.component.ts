import { NgOptimizedImage } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { ToastService } from '@app/core/services/toast.service';
import { CheatCodeDirective } from '@app/shared/directives/cheat-code.directive';
import { RevealOnScrollDirective } from '@app/shared/directives/reveal-on-scroll.directive';
import { GenericSectionBlockComponent } from '@app/shared/ui/sections';

@Component({
  selector: 'trollysix-easter-egg',
  imports: [
    NgOptimizedImage,
    RevealOnScrollDirective,
    CheatCodeDirective,
    NgOptimizedImage,
    GenericSectionBlockComponent,
  ],
  templateUrl: './easter-egg.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class EasterEggComponent {
  private readonly toastService: ToastService = inject(ToastService);

  onCheatEnter() {
    this.toastService.success("You've found the secret image.", {
      title: 'Congratulations!',
    });
  }
}
